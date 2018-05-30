
var next_friend = 0;
var add_flag = false
var friend_to_add = "";
var adding_friend = false;
var img_ele = null,
    x_cursor = 0,
    y_cursor = 0,
    x_img_ele = 0,
    y_img_ele = 0;
    start_img_x = 4.24;
    start_img_y = 4.24;
    start_coord_y = -1.06;
    start_coord_x = -1.06;
    zoom_step = 1.06;
    screen_size = 2.12;
	zoom_limit = 0;
	friend_name = "";

var length = 2;
var index = 0;
var animation_interval;
var dropdown_active = false;
var remove_friends = false;
var friend_to_remove = "";

function dropdown() {
	if(dropdown_active == false){
		dropdown_active = true;
		var x = document.getElementsByClassName("dropdown-menu")[0];
		x.style.display = "block";
		var items = x.getElementsByClassName("dropdown-item");
		x.getElementsByClassName("dropdown-background")[0].style.opacity = "0.8";
		x.getElementsByClassName("dropdown-background")[0].style.visibility = "visible";
		items[index].style.opacity = "1";
		items[index].style.visibility = "visible";
		index++;

		animation_interval = setInterval(function() {
			var x = document.getElementsByClassName("dropdown-menu")[0].getElementsByClassName("dropdown-item");
			if(index < length) {
				items[index].style.opacity = "1";
				items[index].style.visibility = "visible";
				index++;
			} else {
				index = 0;
				clearInterval(animation_interval);
			}
		}, 100);
	} else {
		dropdown_active = false;
		var x = document.getElementsByClassName("dropdown-menu")[0];
		x.style.display = "none";
		x.getElementsByClassName("dropdown-background")[0].style.opacity = "0";
		x.getElementsByClassName("dropdown-background")[0].style.visibility = "hidden";
		var items = x.getElementsByClassName("dropdown-item");
		for(let i = 0; i < items.length; i++) {
			items[i].style.opacity = "0";
			items[i].style.visibility = "hidden";
		}
	}
	
}
	
function build_friends_list(parentElement, list, onclick, image) {
	var parentEl = document.getElementsByClassName(parentElement)[0];
	parentEl.innerHTML = "";
	var title = list.title;
	var display = 1;
	var max = list.max;
	var classname = "";
	next_friend = 0;
	/* create title */
	var tmp = document.createElement('div');
	var str = "<span class=\"locate_title_text\">" + title + "</span>";
	tmp.innerHTML = str;
	tmp.className = "locate_title";
	parentEl.appendChild(tmp);

	for (let i = 0; i < list.list.length; i++) {
		var img = "";
		var img2 = "";

		if(display <= max) {

			classname = "friends_item_" + display;
			list.list[i].display = display++;
		} else {
			classname = "unseen";
			list.list[i].display = 0;
    	}
		if(image != "") {
			let img_name = image;
			if(title == "Amigos") {
					img_name += "_" + list.flags[i];
					str = "<span class='friend_name' onclick=\"show_map('"+list.list[i]+"')\" >" + list.list[i]; + "</span>\n"
					img = "<img class='"+ image + "_img" + "' onclick=\"toggle_visibility('" + classname + "');\"src='assets/" + img_name + ".png' >";
					img2 = "<img class='remove_img'" + "' onclick=\"remove_friend('" + classname + "');\"src='assets/cancel.png' >";
			} else {
				str = "<span class='friend_name' >" + list.list[i]; + "</span>\n"
				img = "<img class='"+ image + "_img'" + "onclick=\"request_friend('" + classname + "');\"src='assets/" + img_name + ".png' >";
			}

		}

        /* create a div the html content and class and append it to the parentElement */
        /* set the onclick to the onclick parameter */
        /*
		if(onclick != "") {
			str_onclick = "" + onclick + "('" + parentElement + "', '" + list.list[i].song + "');";
			parentEl.innerHTML += img + "<div class='" + classname + "' onclick=\"" + str_onclick + "\">\n" + str + "</div>"
		} else {
			parentEl.innerHTML += img + "<div class='" + classname + "' >\n" + str + "</div>"
		}
        */
        parentEl.innerHTML += "<div class='" + classname + "' >\n" + img + str + "</div>"
		//parentEl.appendChild(tmp);
	}


	if(display == 2 && max == 3 || display == 1 && max == 3) {
		tmp = document.createElement('div');
		tmp.className = "friends_item_" + display;
		parentEl.appendChild(tmp);
	} else if(display == 3 && max == 3){
		while(display <= max) {
			tmp = document.createElement('div');
			tmp.className = "friends_item_" + display;
			parentEl.appendChild(tmp);
			display++;
		}
	}

	if(title == "Amigos"){
		//add plus
		tmp = document.createElement("img");
		tmp.className = "add_button";
		tmp.src = "assets/add.png";
		tmp.onclick = function(){ show_people() };
		parentEl.appendChild(tmp);

		//add help
		tmp = document.createElement("img");
		tmp.className = "help_button";
		tmp.src = "assets/help.png"
		parentEl.appendChild(tmp);

		//add more
		tmp = document.createElement("img");
		tmp.className = "more_options";
		tmp.onclick = function(){ dropdown() };
		tmp.src = "assets/more_localizar.png"
		parentEl.appendChild(tmp);

		var drop = document.createElement("div") 
		drop.className = "dropdown-menu";
		var item = document.createElement("div");
		item.className = "dropdown-item"
		item.innerHTML = '<span class="item-text">Procurar amigos</span> <img src="assets/search.png" class="item-img"/>';
		drop.appendChild(item);

		item = document.createElement("div");
		item.className = "dropdown-item"
		item.innerHTML = '<span class="item-text">Remover amigos</span> <img src="assets/cancel.png" class="item-img"/>';
		drop.appendChild(item);

		item = document.createElement("div");
		item.className = "dropdown-background";
		drop.appendChild(item);


		parentEl.appendChild(drop);
	}


	tmp = document.createElement('div');
	tmp.className = "fav_footer";
	parentEl.appendChild(tmp);
	parent = document.getElementsByClassName("fav_footer")[0];
	tmp = document.createElement("img");
	tmp.className = "down_arrow";
	tmp.src = "assets/down_arrow.png";
	tmp.onclick = function(){move_friends(1)};
	parent.appendChild(tmp);
	parent = document.createElement("div");
	parent.id = "up";
	tmp = document.createElement("img");
	tmp.className = "up_arrow";
	tmp.src = "assets/up_arrow.png";
	tmp.onclick = function(){move_friends(-1)};
	parent.appendChild(tmp);
	parentEl.appendChild(parent);
	document.getElementsByClassName("down_arrow")[0].style.display = "none";
	document.getElementsByClassName("up_arrow")[0].style.display = "none";
	if(list.list.length > max){
		document.getElementsByClassName("down_arrow")[0].style.display = "inline";
	}

}

function toggle_visibility(classname) {
	console.log(classname);
	var friends_name = document.getElementsByClassName(classname)[0];
	var vis_img = friends_name.getElementsByClassName("visibility_img")[0];
	friends_name=friends_name.getElementsByClassName("friend_name")[0].innerHTML;

	console.log(friends_name);
	/* swap image */
	if(friends.flags[friends.list.indexOf(friends_name)] == "on"){
		friends.flags[friends.list.indexOf(friends_name)] = "off";
		vis_img.src = "assets/visibility_off.png";
	}
	else {
		vis_img.src = "assets/visibility_on.png";
		friends.flags[friends.list.indexOf(friends_name)] = "on";
	}
	
}

function request_remove(classname) {
	var name = document.getElementsByClassName(classname)[0].getElementsByClassName("friend_name")[0].innerHTML;
	console.log(name);
	friend_to_remove = name;

	clearNotification("notification");

	document.getElementsByClassName("request_localizar")[0].style.visibility = "visible";
	return;

	removing_friend = true;	
	

}

function move_friends(direction) {
	var tmp;
	if(direction == 1){
		tmp = document.getElementsByClassName("unseen")[next_friend++];
		tmp.className = "friends_item_3";
		if(tmp.getElementsByClassName("visibility_img").length != 0)
			tmp.getElementsByClassName("visibility_img")[0].onclick = function() { toggle_visibility("friends_item_3"); };
		else {
			tmp.getElementsByClassName("add_small_img")[0].onclick = function() { request_friend("friends_item_3"); };
		}

		tmp = document.getElementsByClassName("friends_item_1")[0];
		tmp.className = "unseen";
		tmp = document.getElementsByClassName("friends_item_2")[0];
		tmp.className = "friends_item_1";
		if(tmp.getElementsByClassName("visibility_img").length != 0)
			tmp.getElementsByClassName("visibility_img")[0].onclick = function() { toggle_visibility("friends_item_1"); };
		else {
			tmp.getElementsByClassName("add_small_img")[0].onclick = function() { request_friend("friends_item_1"); };
		}

		tmp = document.getElementsByClassName("friends_item_3")[0];
		tmp.className = "friends_item_2";
		if(tmp.getElementsByClassName("visibility_img").length != 0)
			tmp.getElementsByClassName("visibility_img")[0].onclick = function() { toggle_visibility("friends_item_2"); };
		else {
			tmp.getElementsByClassName("add_small_img")[0].onclick = function() { request_friend("friends_item_2"); };
		}
	  }

	  else {

		tmp = document.getElementsByClassName("friends_item_3")[0];
		tmp.className = "unseen";

		tmp = document.getElementsByClassName("friends_item_2")[0];
		tmp.className = "friends_item_3";
		if(tmp.getElementsByClassName("visibility_img").length != 0)
			tmp.getElementsByClassName("visibility_img")[0].onclick = function() { toggle_visibility("friends_item_3"); };
		else {
			tmp.getElementsByClassName("add_small_img")[0].onclick = function() { request_friend("friends_item_3"); };
		}

		tmp = document.getElementsByClassName("friends_item_1")[0];
		tmp.className = "friends_item_2";
		if(tmp.getElementsByClassName("visibility_img").length != 0)
			tmp.getElementsByClassName("visibility_img")[0].onclick = function() { toggle_visibility("friends_item_2"); };
		else {
			tmp.getElementsByClassName("add_small_img")[0].onclick = function() { request_friend("friends_item_2"); };
		}

		tmp = document.getElementsByClassName("unseen")[--next_friend];
		tmp.className = "friends_item_1";
		if(tmp.getElementsByClassName("visibility_img").length != 0)
			tmp.getElementsByClassName("visibility_img")[0].onclick = function() { toggle_visibility("friends_item_1"); };
		else {
			tmp.getElementsByClassName("add_small_img")[0].onclick = function() { request_friend("friends_item_1"); };
		}

	  }
	  if(!document.getElementsByClassName("unseen")[next_friend]){
		document.getElementsByClassName("down_arrow")[0].style.display = "none";
	  }
	  else{
		document.getElementsByClassName("down_arrow")[0].style.display = "inline";
	  }
	  if(!document.getElementsByClassName("unseen")[next_friend-1]){
		document.getElementsByClassName("up_arrow")[0].style.display = "none";
	  }
	  else{
		document.getElementsByClassName("up_arrow")[0].style.display = "inline";
	  }
}

function show_people(){
	if(adding_friend) {
		clearNotification("notification");
		document.getElementsByClassName("request_localizar")[0].style.visibility = "visible";
		return;
	}

	clearNotification("notification");
	add_flag = true;
	build_friends_list("Localizar",people,"","add_small");
}

function show_friends(){
	build_friends_list("Localizar",friends,"","visibility");

}

function cancel(awnser) {
	if(awnser == "Sim") {
		friend_to_add = "";
		adding_friend = false;
		document.getElementsByClassName("request")[0].style.visibility = "hidden";
		document.getElementsByClassName("add_button")[0].src = "assets/add.png";
		show_notification("Pedido cancelado")	
	}

	document.getElementsByClassName("request_localizar")[0].style.visibility = "hidden"
}

function request_friend(classname) {
	var name = document.getElementsByClassName(classname)[0].getElementsByClassName("friend_name")[0].innerHTML;
	console.log(name);
	friend_to_add = name;

	adding_friend = true;
	document.getElementsByClassName("request")[0].style.visibility = "visible";
	document.getElementsByClassName("request_to")[0].innerHTML = "iRave de " + name;

	back();
	document.getElementsByClassName("add_button")[0].src = "assets/cancel.png";

	//people.flags[people.list.indexOf(name)] = setTimeout(function() { add_friend(classname); }, 4000 + Math.round(Math.random() * 3000))

}

function add_friend(awnser) {
	var name = friend_to_add;
	friend_to_add = "";

	document.getElementsByClassName("request")[0].style.visibility = "hidden";
	document.getElementsByClassName("request_localizar")[0].style.visibility = "hidden";
	document.getElementsByClassName("add_button")[0].src = "assets/add.png";

	if(awnser == "Aceitar") {
		people.list.splice(people.list.indexOf(name), 1);
		console.log(name);

		friends.list.unshift(name);
		friends.flags.unshift("on");
		show_notification(name + " aceitou o seu pedido");
		show_friends();
	} else {
		console.log("do_nothing")
		show_notification(name + " rejeitou o seu pedido");
	}

	adding_friend = false;
}

function show_map(friend){
	clearNotification("notification");
	friend_name = friend;

	document.getElementById("friend_location_name").innerHTML = friend;
	document.getElementById("location").style.top  = coordinates[friend_name].y + '%'; 
	document.getElementById("location").style.left = coordinates[friend_name].x + '%';
	document.getElementById("my_location").style.top  = coordinates["me"].y + '%'; 
	document.getElementById("my_location").style.left = coordinates["me"].x + '%';


	document.getElementById('drag-img').style.width = '4.24in';
	document.getElementById('drag-img').style.height = '4.24in';
	document.getElementById('drag-img').style.top = '-1.06in';
	document.getElementById('drag-img').style.left = '-1.06in';
	
	document.getElementById('drag-img').addEventListener('mousedown', start_drag);
	document.getElementsByClassName('mapa')[0].addEventListener('mousemove', while_drag);
	document.getElementsByClassName('mapa')[0].addEventListener('mouseup', stop_drag);
	
	draw_arrow("my_arrow", "me");
	draw_arrow("friend_arrow", friend_name);
	
	current_screen = "mapa";
	document.getElementsByClassName("mapa")[0].style.display="block";
}


function zoom(zoomincrement) {
    img_ele = document.getElementById('drag-img');
    //var pre_width = img_ele.getBoundingClientRect().width, pre_height = img_ele.getBoundingClientRect().height;
    var pre_width;
    var pre_height;
    var pre_top;
    var pre_left;
    var adjustmentx;
    var adjustmenty;
	console.log("INC " + zoomincrement);
    if((zoom_limit == 2 && zoomincrement == 1) || (zoom_limit == -2 && zoomincrement == -1)) {
        img_ele = null;
        return;
    }
        
    
	zoom_limit += zoomincrement;
	console.log(zoom_limit);

    // if it's the first time zooming, set de default width, height, top and left
    if(img_ele.style.width == "") {
        pre_width  = img_ele.style.width = start_img_x;
        pre_height = img_ele.style.height = start_img_y;
    } else {
        pre_width  = new Number(img_ele.style.width.substring(0, img_ele.style.width.length - 2)).valueOf();
        pre_height = new Number(img_ele.style.height.substring(0, img_ele.style.height.length - 2)).valueOf();
    }

    if(img_ele.style.top == "") {
        pre_top  = start_coord_y;
        pre_left = start_coord_x;
    } else  {
        pre_top = new Number(img_ele.style.top.substring(0, img_ele.style.top.length - 2)).valueOf();
        pre_left = new Number(img_ele.style.left.substring(0, img_ele.style.left.length - 2)).valueOf();
    }

    img_ele.style.width  = pre_width  + zoom_step * zoomincrement + 'in';
    img_ele.style.height = pre_height + zoom_step * zoomincrement + 'in';

    adjustmentx = (pre_left - zoom_step) * (pre_width + zoom_step * zoomincrement )/pre_width + zoom_step;
    adjustmenty = (pre_top - zoom_step) * (pre_height + zoom_step * zoomincrement )/pre_height + zoom_step;

    if(zoom_limit == -1) {
        adjustmenty = -0.5;
    } else if(zoom_limit == -2) {
        adjustmenty = 0;
    }
    img_ele.style.top = adjustmenty + 'in';    
   
   
    if(adjustmentx > -screen_size - zoom_step * zoom_limit && adjustmentx < 0) {
        img_ele.style.left = adjustmentx + 'in';    

    } else if(adjustmentx <= -screen_size - zoom_step * zoom_limit){

        img_ele.style.left = -screen_size - zoom_step * zoom_limit+ 'in';
    } else {
        img_ele.style.left = 0 + 'in'; 
    }
    
    
    
    draw_arrow("my_arrow", "me");
    draw_arrow("friend_arrow", friend_name);
    img_ele = null;
}


function start_drag() {
	img_ele = this;
	/* 1 px = 1/96 in */
	x_img_ele = (window.event.clientX - document.getElementById('drag-img').offsetLeft) / 96;
	y_img_ele = (window.event.clientY - document.getElementById('drag-img').offsetTop) / 96;
}

function stop_drag() {
	img_ele = null;
}

function while_drag() {
	/* 1 px = 1/96 in */
	var x_cursor = window.event.clientX / 96;
	var y_cursor = window.event.clientY / 96;
	if (img_ele !== null) {

		if(y_cursor - y_img_ele > -1.35 - zoom_step * zoom_limit && y_cursor - y_img_ele < -0.65 ){
			img_ele.style.top = (y_cursor - y_img_ele) + 'in';
		}
		if(x_cursor - x_img_ele > -screen_size - zoom_step * zoom_limit && x_cursor - x_img_ele < 0) {
			img_ele.style.left = (x_cursor - x_img_ele) + 'in';
		}
		
		console.log(img_ele.style.left+' - '+img_ele.style.top);
		draw_arrow("my_arrow", "me");
		draw_arrow("friend_arrow", friend_name);
	}
}

function draw_arrow(arrow_id, target) {
	var tmp = document.getElementById("drag-img");
	var arrow = document.getElementById(arrow_id);
	var arrow_left = new Number(arrow.style.left.substring(0, arrow.style.left.length - 2)).valueOf();
	var arrow_top = new Number(arrow.style.top.substring(0, arrow.style.top.length - 2)).valueOf();
	var img_left =  new Number(tmp.style.left.substring(0, tmp.style.left.length - 2)).valueOf();
	var img_top =  new Number(tmp.style.top.substring(0, tmp.style.top.length - 2)).valueOf();
	var img_width =  new Number(tmp.style.width.substring(0, tmp.style.width.length - 2)).valueOf();
	var img_height =  new Number(tmp.style.height.substring(0, tmp.style.height.length - 2)).valueOf();
	var target_x = coordinates[target].x/100 * img_width;
	var target_y = coordinates[target].y/100 * img_height;

	var declive = ((screen_size/2 - img_left) - target_x)/((screen_size/2 - img_top) - target_y);
	var c = 1;
	var angulo = -Math.atan(declive);

	if(angulo > 0){
		angulo += Math.PI; 
	}
	if(screen_size/2 - img_left - target_x < 0){
		angulo += Math.PI;
	}
	else if(screen_size/2 - img_left - target_x == 0 && screen_size/2 -img_top - target_y < 0){
		angulo += Math.PI;
	}
	
	document.getElementById(arrow_id).style.left = 0.96 + Math.sin(angulo)*0.96+ "in";
	document.getElementById(arrow_id).style.top  = 0.96 - Math.cos(angulo)*0.96+ "in";
	document.getElementById(arrow_id).style.transform = "rotate("+angulo+"rad)";
	
	var distance = Math.sqrt(Math.pow(Math.abs(img_left - screen_size/2) - target_x, 2) + Math.pow(Math.abs(img_top - screen_size/2) - target_y , 2));
	if(distance <= 1.16) {
		arrow.style.visibility = "hidden";
		if(target == "me") 
			document.getElementById("my_location").style.visibility = "visible";
		else {
			document.getElementById("location").style.visibility = "visible";
		}
	} else {
		arrow.style.visibility = "visible";
		if(target == "me")
			document.getElementById("my_location").style.visibility = "hidden";
		else {
			document.getElementById("location").style.visibility = "hidden";
		}
	}
}
