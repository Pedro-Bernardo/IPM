
people = {
	"title" : "Procura",
	"max" : "3",
	"list" : ["andré.8", "andré.12", "carolina.98", "gingas.68", "joao.99", "luís.9", "pedro.13", "prateiro.64",  ]
}

friends = {
	"title" : "Amigos",
	"max" : 3,
    "list" : [],
    "flags" : []
}

search_options = [];

search_list = {
	"title" : "Amigos",
	"max" : 3,
	"list" : [],
	"flags" : []
}


coordinates = {
	"andré.8": {"x": 50, "y": 70} ,
	"luís.9": {"x": 60, "y": 62.5} ,
	"joao.99": {"x": 35 , "y":45 } ,
	"andré.12": {"x": 55, "y": 45} ,
	"prateiro.64": {"x": 60 , "y": 40 },
	"carolina.98": {"x": 20 , "y": 35 },
	"gingas.68" : {"x": 20 , "y": 45 },
	"pedro.13" : {"x": 25, "y": 30},
	"me" :  {"x": 20 , "y": 45 }
}



/* mudar nome da funcao 
function zoom(friend) {
	centro=friend;
	var friendX = coordinates[friend].x;
	var friendY = coordinates[friend].y;
	var friend_right;
	var backgroundX;
	var backgroundY = -1.4;
	var positionX;
	var positionY = 1;
	var arrow=coordinates[seta];
	var arrowx;
	var arrowy;


	if(friendX + screen_size / 2 > max_zoom) {
		positionX = friendX+max_x-0.2;
		backgroundX = max_x;
		arrowx=arrow.x+max_x-0.2;

	} else if(friendX - screen_size / 2 < 0) {
		positionX = friendX +min_x-0.2;
		backgroundX = min_x;
		arrowx=arrow.x+min_y-0.2;
	} else {

		positionX =  screen_size / 2-0.2;
		backgroundX = -1 * friendX + screen_size / 2;
		arrowx=arrow.x+backgroundX-0.2;
	}


	if(-1*friendY + screen_size / 2 > min_y) {
		positionY = friendY +min_y-0.2
		backgroundY = min_y;
		arrowy=arrow.y+min_y-0.2;


	} else if(-1*(friendY + screen_size/ 2)  < max_y - screen_size) {
		positionY = friendY+max_y-0.2
		//backgroundY = -1 * friendY + screen_size / 2;
		backgroundY = max_y
		arrowy=arrow.y+max_y-0.2;

	} else {
		positionY =  screen_size / 2-0.2;
		backgroundY = -1 * friendY + screen_size / 2;
		arrowy=arrow.y+backgroundY-0.2;
	}
	if(Math.pow(Math.pow((-1*arrow.x-(backgroundX-1.06)),2)+Math.pow((-1*arrow.y-(backgroundY-1.06)),2),0.5)<2.12/2-0.1){
		document.getElementsByClassName("my_location")[0].style.left = arrowx+0.20+ "in";
		document.getElementsByClassName("my_location")[0].style.top = arrowy+0.45 + "in";
		document.getElementById("my_location_img").style.visibility="visible";
		document.getElementById("my_arrow_img").style.visibility="hidden";
	}
	else{
		var declive=((-backgroundX+1.06)-arrow.x)/((-backgroundY+1.06)-arrow.y);
		var c=1;
		var angulo=-Math.atan(declive);
		if(angulo>0){angulo+=Math.PI;}
		if(-backgroundX+1.06-arrow.x<0){
			angulo+=Math.PI;
		}
		else if(-backgroundX+1.06-arrow.x==0 && -backgroundY+1.06-arrow.y<0){
			angulo+=Math.PI;
		}
		console.log(angulo*180/Math.PI);
		document.getElementsByClassName("my_location")[0].style.left = 0.96 + Math.sin(angulo)*0.96+ "in";
		document.getElementsByClassName("my_location")[0].style.top  = 0.96 - Math.cos(angulo)*0.96+ "in";
		document.getElementById("my_arrow_img").style.transform="rotate("+angulo+"rad)";
		document.getElementById("my_location_img").style.visibility="hidden";
		document.getElementById("my_arrow_img").style.visibility="visible";
	}
	if(friend=="me"){
		document.getElementById("friend_location_img").style.visibility="hidden";
		document.getElementById("my_location_img2").style.visibility="visible";
		document.getElementById("friend_location_name").innerHTML="";
	}
	else{
		document.getElementById("friend_location_img").style.visibility="visible";
		document.getElementById("my_location_img2").style.visibility="hidden";
		document.getElementById("friend_location_name").innerHTML=friend;
	}

	/* Altera posicao do amigo 
	document.getElementsByClassName("friend_location")[0].style.left = positionX + "in";
	document.getElementsByClassName("friend_location")[0].style.top = positionY + "in";

	/* Altera posicao do ecra relativo ao mapa 
	document.getElementsByClassName("mapa")[0].style.backgroundPosition = "" + backgroundX + "in " + backgroundY + "in";

}
function change() {
	var tmp=centro;
	centro=seta;
	seta=tmp;
	zoom(centro);
}

*/