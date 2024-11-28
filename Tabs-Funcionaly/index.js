function tabsOpen(evt, Tab) {
    var i, tabs, links;
    tabs = document.getElementsByClassName("tabs");
    for(i = 0; i<tabs.length; i++){
        tabs[i].style.display = "none"
    }
    links = document.getElementsByClassName("links");
    for (i = 0; i < links.length; i++) {
        links[i].className = links[i].className.replace("active", "")        
    }

    document.getElementById(Tab).style.display = "flex";
    evt.currentTarget.className += " active";
}
