"use strict";

class AudioElemCollection    { // declared a separate class so as not to dirty the global scope 

    constructor() {
        this.class = "AudioElem";
        this.path = "assets/audio/";
        this.format = ".mp3";
        this.audiocollection = {};
    }

    buildAudioElement (elenname){
        const audioelem  = new Audio;
        audioelem.src = this.path+elenname+this.format;
        this.audiocollection[elenname] = audioelem;
    }


    clickSound(elemname) {
        this.audiocollection[elemname].currentTime=0; 
        this.audiocollection[elemname].play();
    }

}

const audioElems = new AudioElemCollection ();  

    function keyClick (EO)  {
        EO=EO||window.event;

        let key=EO.target||EO.srcElement;

        

        console.log (key);

    }     


  function switchFullScreen () {
    let fullscreenEnabled = document.fullscreenElement;

    const htmlelem = document.documentElement;

        if (!fullscreenEnabled) {
            htmlelem.requestFullscreen();
            return;
        } else {
            document.exitFullscreen()
            return;
        }
    }
    




    
const piano = document.querySelector(".piano");

piano.addEventListener('click',keyClick,false);

const butFull = document.querySelector(".fullscreen");
;

butFull.onclick = switchFullScreen;

