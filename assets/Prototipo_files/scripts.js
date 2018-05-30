
var canvas;
var ctx;
var radius;
var app = "Musica";
var visible = true;
var apps = [
        { "name":"Musica",    "src":"assets/Musica.png",    "descricao":"Qual a música?",   "dot":"dot1", "items": stages, "title": "Cartaz"},
        { "name":"Cartaz",    "src":"assets/Cartaz.png",    "descricao":"Cartaz",           "dot":"dot2", "items": stages, "title": "Cartaz" },
        { "name":"Localizar", "src":"assets/Localizar.png", "descricao":"Localizar amigos", "dot":"dot3", "items": stages, "title": "Cartaz"},
        { "name":"Definicoes", "src":"assets/Definicoes.png", "descricao":"Definicoes",        "dot":"dot4", "items": stages, "title": "Cartaz"}
    ];

var screens = [
    {"name": "main-screen", "before": "main-screen"},
    {"name": "menu", "before": "main-screen"},
    {"name": "Cartaz", "before": "menu"},
    {"name": "Musica", "before": "menu"},
    {"name": "Localizar", "before": "menu"},
    {"name": "Definicoes", "before": "menu"},
    {"name":"Bandas","before":"Cartaz"},
    {"name":"info","before":"Bandas"},
    {"name":"Reconhece","before":"Musica"},
    {"name":"Favoritos","before":"Musica"},
    {"name":"MusicList","before":"Favoritos"},
    {"name":"Localizar","before":"menu"},
    {"name":"Impressao","before":"Definicoes"},
    {"name":"mapa","before":"Localizar"},
    {"name":"Device_name","before":"menu"}
];

var current_screen = "main-screen";
var bloqueio = false;
var main_next = "menu";
var time;
var digital = false;
var notification_interval;
var notification_timeout;


var AttachDragTo = (function () {
    var _AttachDragTo = function (el) {
        this.el = el;
        this.mouse_is_down = false;
        
        this.init();
    };
    
    _AttachDragTo.prototype = {
        onMousemove: function (e) {
            if ( !this.mouse_is_down ) return;
            var tg = e.target,
                x = e.clientX,
                y = e.clientY;
    
            tg.style.backgroundPositionX = x - this.origin_x + this.origin_bg_pos_x + 'px';
            tg.style.backgroundPositionY = y - this.origin_y + this.origin_bg_pos_y + 'px';
        },
    
        onMousedown: function(e) {
            this.mouse_is_down = true;
            this.origin_x = e.clientX;
            this.origin_y = e.clientY;
        },
    
        onMouseup: function(e) {
            var tg = e.target,
                styles = getComputedStyle(tg);
    
            this.mouse_is_down = false;
            this.origin_bg_pos_x = parseInt(styles.getPropertyValue('background-position-x'), 10);
            this.origin_bg_pos_y = parseInt(styles.getPropertyValue('background-position-y'), 10);
        },
        
        init: function () {
            var styles = getComputedStyle(this.el);
            this.origin_bg_pos_x = parseInt(styles.getPropertyValue('background-position-x'), 10);
            this.origin_bg_pos_y = parseInt(styles.getPropertyValue('background-position-y'), 10);
            
            //attach events
            this.el.addEventListener('mousedown', this.onMousedown.bind(this), false);
            this.el.addEventListener('mouseup', this.onMouseup.bind(this), false);
            this.el.addEventListener('mousemove', this.onMousemove.bind(this), false);
        }
    };
    
    return function ( el ) {
        new _AttachDragTo(el);
    };
})();




function init_iRave(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    radius = canvas.height / 2;
    setInterval(function(){ myTimer() }, 1000);
    setInterval(function(){ drawSecond() },1000);
    time = setTimeout(function(){ show_instruction(); },5000);
    myTimer();
    drawSecond();
}

function show_notification(text) {
	var notification = document.getElementsByClassName("notification")[0];
	document.getElementsByClassName("notification_text")[0].innerHTML = text;

	notification.style.visibility = "visible";
	/* set opacity to 1 */
	notification.style.opacity = 1;
	notification.style.filter = 'alpha(opacity=100)';
	clearInterval(notification_interval);
	clearTimeout(notification_timeout);
    notification_timeout = setTimeout(function() { fade_out("notification"); }, 1000);
    console.log("RAN");
}

function myTimer() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    if(h < 10)
        h = "0" + h;
    if(m < 10)
        m = "0" + m;

    document.getElementById("time").innerHTML = h + ":" + m;
}

function drawSecond(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.translate(radius, radius);
    var d = new Date();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var second = d.getSeconds();
    second = d.getSeconds();
    second = (second*Math.PI/30);
    ctx.beginPath();
    ctx.lineWidth = radius*0.04
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(second);
    ctx.lineTo(0,-radius*0.95);
    ctx.strokeStyle = "#ff5100";
    ctx.stroke();
    ctx.rotate(-second);
    ctx.translate(-radius, -radius);
}

function show_instruction(){
    if(digital){
        document.getElementById("fingerprint_indication").style.visibility = "visible";
    }
    else{
        document.getElementById("instruction").style.visibility = "visible";
    }
}

function show_menu(){
    document.getElementsByClassName(main_next)[0].style.visibility = "visible";
    if(bloqueio==false){
      document.getElementsByClassName("main-screen")[0].style.zIndex=1;
      document.getElementById("canvas").style.zIndex=0;
      document.getElementById("back").style.zIndex=-1;
    }
    current_screen = main_next;
    clearTimeout(time);
}

function next(){
    for(let i = 0; i < screens.length; i++) {
        if(screens[i].name == current_screen) {
            current_screen = screens[i].Next;
            break;
        }
    }
    document.getElementsByClassName(current_screen)[0].style.visibility = "visible";
}

function move(m){
    var icon = document.getElementsByClassName("icon")[0];
    var actual;
    var next;

    for(let i = 0; i < apps.length; i++){
        if(apps[i].name == icon.name){
            actual = i;
            next = (i + m) % 4;
            if(next < 0) next = 3;
            break;
        }
    }

    app = apps[next].name;
    document.getElementById(apps[actual].dot).src = "assets/dot.png";
    document.getElementById(apps[next].dot).src = "assets/greydot.png";
    icon.name = apps[next].name;
    icon.src = apps[next].src;
    document.getElementsByClassName("AppName")[0].innerHTML = apps[next].descricao;
}

function back() {
    if(add_flag) {
        add_flag = false;
        show_friends();
        return;
    }
    if(dropdown_active) {
        dropdown();
        return;
    }

    if( notification_interval || notification_timeout) {
        clearNotification("notification");
    }

    if(current_screen == "Definicoes" || current_screen == "Device_name") {
        let tmp =  document.getElementsByClassName("switch");
        for(let i = 0; i < tmp.length; i++) {
            tmp[i].style.display = "none";
        }
       
    }
    if(configuring && !scanning) {
        document.getElementById("switch1").getElementsByClassName("input")[0].checked = false;
        configuring = false;
        show_notification("Configuração cancelada");
    }

    if(current_screen == "Bandas")
      current_day = start_day;

    if(current_screen == "Musica"){
        document.getElementsByClassName("fav_number_b")[0].style.visibility = "hidden";
    }

    if(current_screen == "Favoritos") {
        var favs = document.getElementsByClassName("fav_item_number_b");
        for(let i = 0; i < favs.length; i++){
            favs[i].style.visibility = "hidden";
        }
        document.getElementsByClassName("Musica_menu")[0].style.display = "block";
        document.getElementsByClassName("Favoritos")[0].innerHTML = "";
    }

    if(album_flag == true) {
        album_flag = false;
        document.getElementsByClassName("Album")[0].style.visibility = "hidden";
        return;
    }

    if(letra_display) {
        letra_index = 0;
        letra_display = false;
        clearInterval(time_letra);
        document.getElementsByClassName("letra_box")[0].style.visibility = "hidden";
        return;
    }

    if(info_t_display) {
        info_t_display = false;
        document.getElementsByClassName("more_info")[0].style.visibility = "hidden";
        return;
    }

    if(current_screen == "Notify") {
        current_screen = "MusicList";
        document.getElementsByClassName("validation")[0].style.visibility = "hidden";
        return;
    }

    if(current_screen == "MusicList") {
        buildList("Favoritos", favorite_bands, true, "show_band_favorites");
    }

    if(current_screen == "main-screen")
        return;

    if(current_screen == "Reconhece"){
      clearInterval(interval);
      clearTimeout(music_time);
      document.getElementById("ponto1").style.visibility="hidden";
      document.getElementById("ponto2").style.visibility="hidden";
      document.getElementById("ponto3").style.visibility="hidden";
      document.getElementById("Mostra").style.visibility="hidden";
    }

    document.getElementsByClassName(current_screen)[0].style.visibility = "hidden";

    for(let i = 0; i < screens.length; i++) {
        if(screens[i].name == current_screen) {
            if(screens[i].before == "main-screen"){
                document.getElementById("instruction").style.visibility = "hidden";
                document.getElementById("fingerprint_indication").style.visibility = "hidden";
                setTimeout(function(){ show_instruction(); }, 5000);
                main_next = "menu"; /* reset the main_next variable */
            }
            if(current_screen == "Cartaz" || current_screen == "Localizar") {
                document.getElementsByClassName("Cartaz")[0].innerHTML = "";
            }
            else if(screens[i].before == "Cartaz"){
                document.getElementsByClassName(current_screen)[0].innerHTML = "";
                launch_app();
            } else if(current_screen == "mapa") {
                document.getElementsByClassName(current_screen)[0].style.display = "none";
                zoom_limit = 0;
                console.log(zoom_limit);
                /*
                document.getElementById("my_arrow_img").style.visibility = "hidden";
                document.getElementById("my_location_img2").style.visibility = "hidden";
                document.getElementById("my_location_img").style.visibility = "hidden";
                document.getElementById("friend_location_img").style.visibility = "hidden";
                */
            }

            current_screen = screens[i].before;
            break;
        }
    }
}

function launch_app() {
    switch (app) {
      case "Cartaz":
        current_screen = app;
        launch_cartaz();
        break;

      case "Musica":
        current_screen = app;
        launch_musica();
        break;

      case "Localizar":
        current_screen = app;
        launch_localizar();
        break;
        case "Definicoes":
          current_screen = app;
          launch_definicoes();
          break;
      default:
        return;

    }
  }

function launch_localizar() {
    build_friends_list("Localizar", friends, "", "visibility");
    document.getElementsByClassName("Localizar")[0].style.visibility = "visible";
}

function launch_cartaz(){
  buildScrollable( "Cartaz", stages);
  document.getElementsByClassName("Cartaz")[0].style.visibility = "visible";
}

function launch_musica(){
  if(favorites_added > 0) {
        document.getElementsByClassName("fav_number_b")[0].style.visibility = "visible";
        document.getElementsByClassName("fav_number")[0].innerHTML = favorites_added;
  }
  document.getElementsByClassName("Musica")[0].style.visibility = "visible";
}
function launch_definicoes(){
  if(!digital){
    document.getElementsByClassName("switch")[0].getElementsByClassName("input")[0].checked=false;
  }
  document.getElementsByClassName("Definicoes")[0].style.visibility = "visible";
  let tmp =  document.getElementsByClassName("switch");
  for(let i = 0; i < tmp.length; i++) {
      tmp[i].style.display = "block";
  }

}

function sleep() {
  clearNotification("notification");
  if(!bloqueio){
    if(current_screen != "main-screen")
      main_next = current_screen;
    else{
      document.getElementsByClassName("main-screen")[0].style.zIndex = 99;
      document.getElementById("canvas").style.zIndex = 98;
    }
    current_screen = "main-screen";
    document.getElementById("back").style.zIndex = 100;
    document.getElementById("back").style.background = "rgb(0, 0, 0)";
    bloqueio = true;
    clearTimeout(time);
  }
  else if(bloqueio){
    bloqueio = false;
    document.getElementById("instruction").style.visibility = "hidden";
    time = setTimeout(function(){ show_instruction(); }, 5000);
    document.getElementsByClassName("main-screen")[0].style.zIndex = 102;
    document.getElementById("canvas").style.zIndex = 101;
    document.getElementById("back").style.background = "#1a1a1c";
  }
}

function clearNotification(notification) {
    clearInterval(notification_interval);
    clearTimeout(notification_timeout);
    document.getElementsByClassName(notification)[0].style.visibility = "hidden";
}

