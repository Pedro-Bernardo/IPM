var point;
var interval;
var music_time;
var song_index = 0;
var favorites_added = 0;
var info_t_display = false;
var next_fav = 0;
var next_music = 0;
var to_delete_band = ""
var to_delete_song= ""
var album_flag = false;
var time_letra;
var letra_index = 0;
var letra_display = false;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function reconhecer(){
	current_screen = "Reconhece";
	point = 3;
	clearNotification("notification");
	document.getElementById("Procura").style.visibility = "visible";
	interval = setInterval(function(){ points("ponto") }, 500);
	song_index = Math.round(Math.random() * (songs.length - 1));
	song_to_show = songs[song_index];
	document.getElementById("banda").innerHTML = song_to_show.artist;
	document.getElementById("musica").innerHTML = song_to_show.song;
	document.getElementById("back_img").src = calculate_image_name(song_to_show.album);
	document.getElementById("back_img_album").src = calculate_image_name(song_to_show.album);

	let time = 2000 + Math.round(Math.random() * 1000)
	music_time = setTimeout(function(){ show_music() },  time);

}

function fade_out(element_name) {
	var op = 1;  // initial opacity
	var element = document.getElementsByClassName(element_name)[0];
	notification_interval = setInterval(function () {
		if (op <= 0.15){
			clearInterval(notification_interval);
			element.style.visibility = 'hidden';
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.05;
	}, 50);
}


function points(id){

   /* point = 0
     point = 1
     point = 2
     point = 3
     point = 3
     etc..
  */

  if(point == 2){
      document.getElementById(id + "1").style.visibility = "hidden";
      document.getElementById(id + "2").style.visibility = "hidden";
      document.getElementById(id + "3").style.visibility = "hidden";
  }
  point = (point + 1) % 4 ;

  if(point != 3)
    document.getElementById(id + (point + 1)).style.visibility = "visible";
}

function show_music(){
	if(song_to_show.favorite) {
		document.getElementById("fav_status").src = "assets/checked.png";
	} else {
		document.getElementById("fav_status").src = "assets/plus.png";
	}

	/* para de mostrar os pontos */
	clearInterval(interval);
	/* esconde todos os pontos */
	document.getElementById("ponto1").style.visibility = "hidden";
	document.getElementById("ponto2").style.visibility = "hidden";
	document.getElementById("ponto3").style.visibility = "hidden";
	/* esconde o ecrã de procura */
	document.getElementById("Procura").style.visibility = "hidden";
	/* mostra o ecrã da musica */
	document.getElementById("Mostra").style.visibility = "visible";

}

function show_favoritos() {
	if(favorites_added == 0) {
		show_notification("Não há favoritos");
		return;
	}
	current_screen = "Favoritos";
	buildList("Favoritos", favorite_bands, true, "show_band_favorites");
	document.getElementsByClassName("Favoritos")[0].style.visibility = "visible";
	document.getElementsByClassName("Musica_menu")[0].style.display = "none";
}

function calculate_image_name(album) {
	var name = "assets/albums/";

		// remove spaces in band name
	for(let i = 0; i < album.length; i++){
		if(album[i] == ' ')
			name += '_';
		else
			name += album[i];
	}
		return name + ".png";
}

function favorite() {
	/* if it's in the favorites */
	var notification_text;

	if(songs[song_index].favorite) {
		document.getElementById("fav_status").src = "assets/plus.png"
		/* remove from array */
		let index = favorite_bands[songs[song_index].artist].list.indexOf(songs[song_index].song);
		favorite_bands[songs[song_index].artist].list.splice(index, 1);
		songs[song_index].favorite = false;
		notification_text = "Removido dos favoritos";
		favorites_added--;
		if(favorites_added == 0) {

			document.getElementsByClassName("fav_number_b")[0].style.visibility = "hidden";
		}
		document.getElementsByClassName("fav_number")[0].innerHTML = favorites_added;


	} else {
		document.getElementById("fav_status").src = "assets/checked.png"
		favorite_bands[songs[song_index].artist].list.push(songs[song_index].song);
		songs[song_index].favorite = true;
		notification_text = "Adicionado aos favoritos";
		favorites_added++;
		if(favorites_added == 1) {
			document.getElementsByClassName("fav_number_b")[0].style.visibility = "visible";

		}
		document.getElementsByClassName("fav_number")[0].innerHTML = favorites_added;


	}

	show_notification(notification_text);

}

function show_information() {
	info_t_display = true;
	clearNotification("notification");
	document.getElementsByClassName("more_info")[0].style.visibility = "visible";
}

function buildList(parentElement, list, image_flag, onclick) {
	document.getElementsByClassName("MusicList")[0].innerHTML = "";
	next_fav = 0;
	parentEl = document.getElementsByClassName(parentElement)[0];
	parentEl.innerHTML = "";
	var title = list.title;
	var display = 1;
	var seen = 0;
	var max = list.max;
	var classname = "";
	/* create title */
	var tmp = document.createElement('div');
	var str = "<span class=\"title_text\">" + title + "</span>";
	tmp.innerHTML = str;
	tmp.className = "fav_title";
	parentEl.appendChild(tmp);
	var attribute;
  var bands=0;
	for (attribute in list) {
		/* foe every other attribute appart from max and title */
		if (attribute != "max" && attribute != "title") {

			/* set display and classname */
			if(list[attribute].list.length != 0){
        bands++;
				if(display <= max){
					list[attribute].display = display;
					classname = "fav_item" + display++;
				} else
					classname = "unseen";

			} else {
				list[attribute].display = 0;
				classname = "empty";
			}
			/* if there are songs in the favorite list corresponding to the attribute varialbe,
				then add artist (attribute) */

			if(image_flag) {
				let image = attribute + ".png";
				str = '\t<div class="fav_item_number_b"> <span class="fav_item_number">' + favorite_bands[attribute].list.length +'</span></div>\n'
				str += '\t<img class="fav_img" src="assets/artists/' + image + '"><span class="band_name">' + attribute + '</span>\n';

			}

			/* create a div the html content and class and append it to the parentElement */
			if(onclick != "") { /* set the onclick to the onclick parameter */
				str_onclick = "" + onclick + "('" + parentElement + "', '" + attribute.capitalize() + "');";

			}
			parentEl.innerHTML += "<div class='" + classname + "' onclick=\"" + str_onclick + "\">\n" + str + "</div>"
			//parentEl.appendChild(tmp);
		}


	}
	while(display <= max) {
		tmp = document.createElement('div');
		tmp.className = "fav_item" + display;
		parentEl.appendChild(tmp);
		display++;
	}

  	tmp = document.createElement('div');
	tmp.className = "fav_footer";
	parentEl.appendChild(tmp);
	parent=document.getElementsByClassName("fav_footer")[0];
	tmp=document.createElement("img");
	tmp.className="down_arrow";
	tmp.src="assets/down_arrow.png";
	tmp.onclick=function(){move_favorites(1)};
	parent.appendChild(tmp);
	parent=document.createElement("div");
	parent.id="up";
	tmp=document.createElement("img");
	tmp.className="up_arrow";
	tmp.src="assets/up_arrow.png";
	tmp.onclick=function(){move_favorites(-1)};
	parent.appendChild(tmp);
	parentEl.appendChild(parent);
	document.getElementsByClassName("down_arrow")[0].style.display="none";
	document.getElementsByClassName("up_arrow")[0].style.display="none";
	if(bands>max){
		document.getElementsByClassName("down_arrow")[0].style.display="inline";
	}
}

function build_data_list(band, songlist, max) {
	var display = 1;
	favorites.title = band;
	favorites.max = max;
	favorites.list = [];
	for(let i = 0; i < songlist.length; i++) {
		var obj = new Object();
		obj.song = songlist[i];

		if(display <= max) {
			obj.display = display++;
		} else {
			obj.display = 0;
		}
		favorites.list.push(obj);
	}

}

function show_band_favorites(parentElement, band) {
	current_screen = "MusicList";
	build_data_list(band, favorite_bands[band].list, 3);
	build_common_list("MusicList", favorites, "", "delete")


	document.getElementsByClassName("MusicList")[0].style.visibility = "visible";
}

function build_common_list(parentElement, list, onclick, image) {
	if(parentElement == "MusicList")
		document.getElementsByClassName("Favoritos")[0].innerHTML = "";
	var parentEl = document.getElementsByClassName(parentElement)[0];
	parentEl.innerHTML = "";
	var title = list.title;
	var display = 1;
	var max = list.max;
	var classname = "";
  next_music=0;
	/* create title */
	var tmp = document.createElement('div');
	var str = "<span class=\"band_text\">" + title + "</span>";
	tmp.innerHTML = str;
	tmp.className = "fav_title";
	parentEl.appendChild(tmp);

	for (let i = 0; i < list.list.length; i++) {
		var img = "";
		str = "<span class='song_name'>" + list.list[i].song; + "</span>\n"

		if(display <= max) {

			classname = "list_item_" + display;
			if(image != "") {
				img = "<img class='"+ image + "_img" + display + "' onclick=\"notify('" + classname + "', '" + title + "');\" src='assets/" + image + ".png' >";
			}
			list.list[i].display = display++;
		} else {
			classname = "unseen";
			list.list[i].display = 0;
		}

		/* create a div the html content and class and append it to the parentElement */
		if(onclick != "") { /* set the onclick to the onclick parameter */
			str_onclick = "" + onclick + "('" + parentElement + "', '" + list.list[i].song + "');";
			parentEl.innerHTML += img + "<div class='" + classname + "' onclick=\"" + str_onclick + "\">\n" + str + "</div>"
		} else {
			parentEl.innerHTML += img + "<div class='" + classname + "' >\n" + str + "</div>"
		}

		//parentEl.appendChild(tmp);
	}
	if(display == 2 && max == 3) {
		tmp = document.createElement('div');
		tmp.className = "list_item_" + display;
		parentEl.appendChild(tmp);
	} else {
		while(display <= max) {
			tmp = document.createElement('div');
			tmp.className = "list_item_" + display;
			parentEl.appendChild(tmp);
			display++;
		}
	}


	tmp = document.createElement('div');
	tmp.className = "fav_footer";
	parentEl.appendChild(tmp);
	parent=document.getElementsByClassName("fav_footer")[0];
	tmp=document.createElement("img");
	tmp.className="down_arrow";
	tmp.src="assets/down_arrow.png";
	tmp.onclick=function(){move_musics(1)};
	parent.appendChild(tmp);
	parent=document.createElement("div");
	parent.id="up";
	tmp=document.createElement("img");
	tmp.className="up_arrow";
	tmp.src="assets/up_arrow.png";
	tmp.onclick=function(){move_musics(-1)};
	parent.appendChild(tmp);
	parentEl.appendChild(parent);
	document.getElementsByClassName("down_arrow")[0].style.display="none";
	document.getElementsByClassName("up_arrow")[0].style.display="none";
	if(list.list.length>max){
		document.getElementsByClassName("down_arrow")[0].style.display="inline";
	}

}


function delete_favorite(song, band) {
	var i;

	/*delete!*/
	for(i = 0; i < songs.length; i++) {
		if(songs[i].song == song) {
			songs[i].favorite = false;
			favorites_added--;
			document.getElementsByClassName("fav_number")[0].innerHTML = favorites_added;
			break;
		}

	}
	for(i = 0; i < favorites.list.length; i++) {
		if(favorites.list[i].song == song) {
			favorites.list.splice(i, 1);
			break;
		}
	}

	let index = favorite_bands[band].list.indexOf(song);
	favorite_bands[band].list.splice(index, 1);

	build_common_list("MusicList", favorites, "", "delete");


	if(favorites.list.length == 0)
		back();


	if(favorites_added == 0) {
		document.getElementsByClassName("fav_number_b")[0].style.visibility = "hidden";
		back();
	}


	/*notify!*/
}


function move_favorites(direction){
  if(direction==1) {
    document.getElementsByClassName("unseen")[next_fav++].className="fav_item2";
    document.getElementsByClassName("fav_item1")[0].className="unseen";
    document.getElementsByClassName("fav_item2")[0].className="fav_item1";
  }
  else {
    document.getElementsByClassName("fav_item2")[0].className="unseen";
    document.getElementsByClassName("fav_item1")[0].className="fav_item2";
    document.getElementsByClassName("unseen")[--next_fav].className="fav_item1";
  }
  if(!document.getElementsByClassName("unseen")[next_fav]) {
    document.getElementsByClassName("down_arrow")[0].style.display="none";
  }
  else {
    document.getElementsByClassName("down_arrow")[0].style.display="inline";
  }
  if(!document.getElementsByClassName("unseen")[next_fav-1]) {
    document.getElementsByClassName("up_arrow")[0].style.display="none";
  }
  else {
    document.getElementsByClassName("up_arrow")[0].style.display="inline";
  }
}


function move_musics(direction) {
	if(direction==1){
		document.getElementsByClassName("unseen")[next_music++].className="list_item_3";
		document.getElementsByClassName("list_item_1")[0].className="unseen";
		document.getElementsByClassName("list_item_2")[0].className="list_item_1";
		document.getElementsByClassName("list_item_3")[0].className="list_item_2";
	  }
	  else{
		document.getElementsByClassName("list_item_3")[0].className="unseen";
		document.getElementsByClassName("list_item_2")[0].className="list_item_3";
		document.getElementsByClassName("list_item_1")[0].className="list_item_2";
		document.getElementsByClassName("unseen")[--next_music].className="list_item_1";
	  }
	  if(!document.getElementsByClassName("unseen")[next_music]){
		document.getElementsByClassName("down_arrow")[0].style.display="none";
	  }
	  else{
		document.getElementsByClassName("down_arrow")[0].style.display="inline";
	  }
	  if(!document.getElementsByClassName("unseen")[next_music-1]){
		document.getElementsByClassName("up_arrow")[0].style.display="none";
	  }
	  else{
		document.getElementsByClassName("up_arrow")[0].style.display="inline";
	  }
}


function notify(classname, band) {
	current_screen = "Notify";
	var song = document.getElementsByClassName(classname)[0].getElementsByClassName("song_name")[0].innerHTML;
	document.getElementsByClassName("question_song")[0].innerHTML = "\"" + song + "\" dos favoritos?";
	document.getElementsByClassName("validation")[0].style.visibility = "visible";

	to_delete_band = band;
	to_delete_song = song;
}


function notify_awnser(awnser) {
	if(awnser == "Sim") {
		current_screen = "MusicList";
		delete_favorite(to_delete_song, to_delete_band)
	}

	current_screen = "MusicList";
	document.getElementsByClassName("validation")[0].style.visibility = "hidden";
}


function show_album() {
	var song = songs[song_index];
	document.getElementsByClassName("Album")[0].style.visibility = "visible";
	var info = "" + song.year + " · " + song.number + " songs " + song.duration;
	/*
	document.getElementById("info_extra").innerHTML = info;
	document.getElementById("artista").innerHTML = song.artist;
	*/
	document.getElementById("album").innerHTML = song.album;
	album_flag = true;
}


function show_letra(){
	letra_display = true;
	document.getElementsByClassName("letra_box")[0].style.visibility = "visible";
	document.getElementById("letra").innerHTML = letras[song_index][letra_index++];
	time_letra=setInterval(function(){poe_letra() },3000);
  }
  function poe_letra(){
	document.getElementById("letra").innerHTML=letras[song_index][letra_index++];
	if(letra_index==letras[song_index].length){
	  back();
	}
  }
