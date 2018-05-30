var configuring = false;
var configure_timeout;
var scanning = false;

function def_move(direction) {
    if(direction == 1) {
        clearNotification("notification");
        current_screen = "Device_name";
        document.getElementsByClassName("Device_name")[0].style.visibility = "visible";
        document.getElementsByClassName("Definicoes")[0].style.visibility = "hidden";
        
    } else {
        current_screen = "Definicoes";
        document.getElementsByClassName("Device_name")[0].style.visibility = "hidden";
        document.getElementsByClassName("Definicoes")[0].style.visibility = "visible";
    }
}


function configurar() {
    clearNotification("notification");
    if(!digital){
      current_screen = "Impressao";
      document.getElementsByClassName("Impressao")[0].style.visibility="visible";
      configuring = true;
    }
    else{
      digital = false;
      show_notification("Impressão digital desativada");
    }
  }
  function configurado(){
      digital = true;
      var tmp = document.getElementsByClassName("fingerprint")[0];
      tmp.visibility = "hidden";
      tmp.className = "fingerprint";
      document.getElementsByClassName("Impressao")[0].style.visibility="hidden";
      show_notification("Impressão digital ativada");
      document.getElementsByClassName("Impressao")[0].style.visibility = "hidden";
      current_screen = "Definicoes";
      configuring = false;
      scanning = false;
  }
  
  function scan() {
      var tmp = document.getElementsByClassName("fingerprint")[0];
      tmp.visibility = "visible";
      tmp.className = "fingerprint scanning";
      configure_timeout = setTimeout(function() {configurado();}, 800);
      scanning = true;
  }
  
  function visibility() {
      if(visible) {
          show_notification("Invisível");
      } else 
          show_notification("Visível");
  
      visible = !visible;
      
  }