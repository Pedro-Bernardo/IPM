const name_index = 0;
const content_index = 1;
const start_day = 1;
var menu_index = 0;
var current_day = 1;
var current_day_number = 5;

var stage_storage = {
    "Principal" : Principal,
    "Loud" : Loud,
};


function buildScrollable(parentElement, items) {
    var list, li;
    var items_name;
    var items_content;
    var title;
    var max;

    if(parentElement == "Bandas") {
        var items_name = items[name_index].name;
        var items_content = items[content_index].main.day[current_day].content;
        var title = items[content_index].main.title;
        console.log(current_day)
        console.log(items[content_index].main.day[current_day].number)
        console.log(current_day_number)

        if(current_day_number == items[content_index].main.day[current_day].number-1){
            title+="<p class=\"Bandas_dia_antes\">" +"Hoje"+"</p>";
        }
        else if(current_day != 0) {
            title += "<p class=\"Bandas_dia_antes\">" + (items[content_index].main.day[current_day].number-1) + "</p>";
        }

        if(current_day!=1)
          title+="<p class=\"Bandas_dia\">" +items[content_index].main.day[current_day].number+"</p>";
        else
          title+="<p class=\"Bandas_dia\">" +"Hoje"+"</p>";


        if(current_day_number == items[content_index].main.day[current_day].number+1) {
            title+="<p class=\"Bandas_dia_depois\">" +"Hoje"+"</p>";

        } else if(current_day!=items[content_index].main.day.length-1) {
            title+="<p class=\"Bandas_dia_depois\">" + (items[content_index].main.day[current_day].number+1) + "</p>";
        }
          
          


        title+="<div class=\"navs\">"
        for(let i=0;i<items[content_index].main.day.length;i++){
          if(i==current_day)
            title+="<img class=\"line_nav\" id=\"line"+current_day+"\" src=\"assets/grey_line_nav.png\">";
            else {
              title+="<img class=\"line_nav\" id=\"line"+current_day+"\" src=\"assets/line_nav.png\">";
            }
        }
        title+="</div>";
        var max = items[content_index].main.max;
    } else {
        var items_name = items[name_index].name;
        var items_content = items[content_index].main.content;
        var title = items[content_index].main.title;
        var max = items[content_index].main.max;
    }

    var seen = 0;

    var inner = "<ul class=\"" + parentElement + "-container\">\n";
    inner += "\t<li class=\""  + parentElement + "-title\">" + title + "</li>\n";
    if(!items_content || items_content.length == 0) {
        inner += "</ul>";
        document.getElementsByClassName(parentElement)[0].innerHTML = inner;
        return;
    }
    if(parentElement == "Bandas") title = "Bandas";
    if(parentElement == "Cartaz" && title != "Horários") title = "Cartaz";

    if(items == stages){
        menu_index = 0;
        /* for the stages, there are 2 cases: */
        if(items_content.length < max) {
            /* if there are less than the max */
            for(let i = 0; i < max; i++) {
                /* if the i-th item is defined, show it */
                if(items_content[i]) {
                    items_content[i].display = "" + (i + 1);
                    inner += "\t<li class=\"" + title + "-item" + (i + 1)+"\" onclick=\"show_bands(\'Bandas\',\'"+items_content[i].text+"\')\">"+ items_content[i].text  + "<img id=\"more-item" + (i + 1)+"\" src=\"assets/more.png\"></li>\n";
                } else {
                    /* else, create it anyway for stuctural purposes, but set it to empty */
                    inner += "\t<li class=\"" + title + "-item" + (i + 1) + "\"></li>\n";
                }
            }
        } else {
            /* if there are more items than the max, init teir displays and show up to max of them*/
            for(let i = 0; i < items_content.length; i++) {
                if(i < max) {
                    items_content[i].display = "" + (i + 1);
                    inner += "\t<li class=\"" + title + "-item" + (i + 1)+"\" onclick=\"show_bands(\'Bandas\',\'"+items_content[i].text+"\')\">"+  items_content[i].text + "<img id=\"more-item" + (i + 1)+"\" src=\"assets/more.png\"></li>\n";
                } else {
                    items_content[i].display = "0";
                }
            }
        }
    }
    else if(parentElement == "Bandas"){
        var band_name;
        for(let i = 0; i < items_content.length; i++) {
            if( i % 2 == 0)
                band_name = items_content[i].text;
            if(i < max) {
                items_content[i].display = "" + (i + 1);
                inner += "\t<li class=\"" + title + "-item" + (i + 1) + "\" onclick=\'showBandInfo(\"" + band_name +"\");\'>"+ items_content[i].text;
                if(i%2==0)inner+="<img id=\"info-item" + (i + 1)+"\" src=\"assets/info.png\"></li>\n";
                else inner+="</li>\n";
            } else {
                items_content[i].display = "0";
            }
        }
    } else {
        for(let i = 0; i < items_content.length; i++) {
            if(i < max) {
                items_content[i].display = "" + (i + 1);
                inner += "\t<li class=\"" + title + "-item" + (i + 1)+"\">"+  items_content[i].text + "</li>\n";
            } else {
                items_content[i].display = "0"
            }
        }
    }

    if(parentElement != "Bandas"){
      if(menu_index == 0)
        inner += "\t<li id=\"right\"> <img class=\"right_arrow_list\" src=\"assets/right_arrow.png\" onclick=\"move_cartaz()\"> </li>\n";
      else
        inner += "\t<li id=\"left\"> <img class=\"left_arrow_list\" src=\"assets/left_arrow.png\" onclick=\"move_cartaz()\"> </li>\n";
    }
    else {
        let day = items[content_index].main.day;
        if(day.length != 1) {
            if(current_day == day.length - 1) {
                inner += "\t<li id=\"left\"> <img class=\"left_arrow_list\" src=\"assets/left_arrow.png\" onclick=\"move_day(-1, \'" + items_name + "\')\"> </li>\n";
            } else if (current_day == 0) {
                inner += "\t<li id=\"right\"> <img class=\"right_arrow_list\" src=\"assets/right_arrow.png\" onclick=\"move_day(1, \'" + items_name + "\')\"> </li>\n";
            } else {
                inner += "\t<li id=\"left\"> <img class=\"left_arrow_list\" src=\"assets/left_arrow.png\" onclick=\"move_day(-1, \'" + items_name + "\')\"> </li>\n";
                inner += "\t<li id=\"right\"> <img class=\"right_arrow_list\" src=\"assets/right_arrow.png\" onclick=\"move_day(1, \'" + items_name + "\')\"> </li>\n";
            }
        }
    }

    inner += "\t<li id=\"up\"> <img class=\"up_arrow\" src=\"assets/up_arrow.png\" onclick=\"arrow_tap_vertical(\'" + parentElement + "\', " + items_name + ", " + max + ", -1)\"> </li>\n";
    inner += "\t<li id=\"footer\"> <img class=\"down_arrow\" src=\"assets/down_arrow.png\" onclick=\"arrow_tap_vertical(\'" + parentElement + "\', " + items_name + ", " + max + ", 1)\"> </li>\n";

    inner += "</ul>";
    //console.log(inner);
    document.getElementsByClassName(parentElement)[0].innerHTML = inner;

    if(max == 3 && items_content.length == 1) {
        document.getElementsByClassName(title + "-item3")[0].style.borderColor = "transparent";
    }

    if(items_content[items_content.length - 1].display != 0) {
        document.getElementsByClassName("down_arrow")[0].style.display = "none";
    }
    if(items_content[0].display != 0) {
        document.getElementsByClassName("up_arrow")[0].style.display = "none";
    }

    if(document.getElementsByClassName("Bandas_dia")[0] != null) {
        var before = document.getElementsByClassName("Bandas_dia_antes")[0];
        var after = document.getElementsByClassName("Bandas_dia_depois")[0];
        if(before != null && before.innerHTML == "Hoje") {
            before.style.fontSize = "0.14in";
            before.style.paddingTop = "0.05in";
        } else if(before != null){
            before.style.fontSize = "0.16in";
        }
    
        if(after != null && after.innerHTML == "Hoje") {
            after.style.fontSize = "0.14in";
            after.style.paddingTop = "0.05in";
        } else if(after != null) {
            after.style.fontSize = "0.16in";
        }
    
    }
    
}


function arrow_tap_vertical(parentElement, items, max, direction) {
    var items_content;
    var title;
    var items_name = items[name_index].name;

    if(parentElement == "Bandas") {
        items_content = items[content_index].main.day[current_day].content;
        title = "Bandas";
      }else {
        items_content = items[content_index].main.content;
        title = items[content_index].main.title;
    }

    var last = direction;
    /* define last como o limite da iteração. */
    if(last == -1){ last = max; }



    for(let i = 0; i < items_content.length; i++) {
       if(items_content[i].display == last) { //when it finds the first or last (depending on the direction)
            /* hide the first element found */
            items_content[i].display = 0;
            /* loop through the next max elements from i + (direction), works both ways
                because of the condition */
            if(stage_storage[items_name] || items == horarios){ i += direction; }
            for(let next = (i + direction), display = last; display <= max && display > 0; next += direction, display += direction) {

                items_content[next].display = display;
                document.getElementsByClassName("" + title + "-item" + display)[0].innerHTML = items_content[next].text;





                if(parentElement == "Bandas") {
                    if( display % 2 != 0){
                    document.getElementsByClassName("" + title + "-item" + display)[0].onclick = function() { showBandInfo(items_content[next].text); };
                    document.getElementsByClassName("" + title + "-item" + (display + 1))[0].onclick = function() { showBandInfo(items_content[next].text); };
                    document.getElementsByClassName("" + title + "-item" + display)[0].innerHTML += "<img id=\"info-item" + display +"\" src=\"assets/info.png\">";
                  }

                } else if(parentElement == "Cartaz") {
                    document.getElementsByClassName("" + title + "-item" + display)[0].onclick = function() { show_bands("Bandas", items_content[next].text); };
                }

            }
            break;
        }
    }

    /* handles arrow visibility */
    if(items_content[items_content.length - 1].display != 0) {
        document.getElementsByClassName("down_arrow")[0].style.display = "none";
    }
    else if(items_content[items_content.length - 1].display == 0) {
        document.getElementsByClassName("down_arrow")[0].style.display = "inline";
    }
    if(items_content[0].display != 0) {
        document.getElementsByClassName("up_arrow")[0].style.display = "none";
    }
    else if(items_content[0].display == 0) {
        document.getElementsByClassName("up_arrow")[0].style.display = "inline";
    }

}

function move_cartaz(){
    if(menu_index == 0){
        menu_index = 1;
        buildScrollable("Cartaz", horarios);
    } else {
        menu_index = 0;
        buildScrollable("Cartaz", stages);
    }
}

function move_day(direction, stage){
    current_day += direction;
    buildScrollable("Bandas", stage_storage[stage]);

}

function show_bands(parentElement, stage){
  document.getElementsByClassName("Cartaz")[0].innerHTML = "";
  buildScrollable(parentElement, stage_storage[stage]);
  document.getElementsByClassName("Bandas")[0].style.visibility = "visible";
  current_screen = "Bandas";
}


function showBandInfo(band) {
    text = document.getElementsByClassName("info_text")[0];
    var name = "";
    // remove spaces in band name

    for(let i = 0; i < band.length; i++){
      if(band[i]!=' ')
        name += band[i];
    }

    text.innerHTML = bands[band]+"<img id=\"band_img\" src=\"assets/bands/" + name + ".png\">";
    document.getElementsByClassName("info")[0].style.visibility = "visible";
    current_screen = "info";
}
