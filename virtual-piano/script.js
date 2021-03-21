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
        return audioelem;
    }


    clickSound(elemname) {
        this.audiocollection[elemname].currentTime=0; 
        this.audiocollection[elemname].play();
    }

}

            class Controller  {
                constructor () {
                    this.class = "Controller";
                    this.linkList = {};
                }

                addLinks (link, item) {
                    this.linkList[link] = item;
                    return this;
                }
            }



            const audioElems = new AudioElemCollection (); // class for work on audioelements
            const keyList = new Controller();// class for work on keypad




    function keyClick (EO)  {
        EO=EO||window.event;
        let key=EO.target||EO.srcElement;

        let note = key.dataset.note;
        audioElems.clickSound(note);

        console.log (key.dataset);

    }

    function pendMouseLeave (e) {

    }
    



function dataSet (htmlcol){

    htmlcol.forEach((item) =>  {
        console.log (item.dataset)

        if (item.dataset) {
            let note = item.dataset.note;
            let key = item.dataset.letter;

            let audio = audioElems.buildAudioElement(note);

            keyList.addLinks(key,audio);
            console.log(keyList)
        }

    });
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
    

    
const piano = document.querySelector(".piano"); //div - wrapper for keys

const pianoKeys = document.querySelectorAll (".piano-key"); // keys




console.log (pianoKeys)

piano.addEventListener('mousedown',keyClick,false);

const butFull = document.querySelector(".fullscreen");
;



        dataSet(pianoKeys);
        butFull.onclick = switchFullScreen;
        console.log (audioElems, keyList)




