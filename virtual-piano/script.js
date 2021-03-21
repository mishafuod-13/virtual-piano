"use strict";

function switchFullScreen ( ) {
    let fullscreenEnabled = document.fullscreenEnabled;

    var html = document.documentElement;

     if (fullscreenEnabled) {
        html.requestFullscreen();
     return 1;
    }
    Document.exitFullscreen();
    return 2;
}



let butfull = document.querySelector(".fullscreen");
console.log (butfull);

butfull.onclick = switchFullScreen;

