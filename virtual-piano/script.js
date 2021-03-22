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

class Controller  {   //other class  for keypad 
    constructor ()   {
        this.class = "Controller";
        this.linkList = {};
    }

    addLinks (link, item)  {
        this.linkList[link] = item;
        return this;
     }
}


const audioElems = new AudioElemCollection ();          // class for work on audioelements
const keyList = new Controller();         // class for work on keypad


function addClassOrFill (elem,newval,newclass) {    //null if you dont have piece of functionality:)

    if (newval!==null) {
        elem.innerHTML = newval;
    }
    if (newclass!==null) {
        elem.classList.add(""+newclass);
    }
}


function removeClass(elem, oldclass)  {

    elem.classList.remove(""+oldclass);

}


function removeListenerMouse (EO) {            //functions-listeners and remove-listeners on mouseivent
    EO=EO||window.event;
    let key = EO.target||EO.srcElement;        

    if (key.dataset.note!==undefined) {
        removeClass(key, "piano-key-active");
        key.removeEventListener("mouseleave",removeListenerMouse);
    }

}

function pendMouseLeave (EO) {
    EO=EO||window.event;
    let key = EO.target||EO.srcElement;

    if (key.dataset.note!==undefined) {
        audioElems.clickSound(key.dataset.note)
        addClassOrFill (key, null,"piano-key-active");
        key.addEventListener("mouseleave",removeListenerMouse);
    }
}


function removeListeners (EO) {
    EO=EO||window.event;
    let key = EO.target||EO.srcElement;
    
    piano.removeEventListener('mouseover',pendMouseLeave,false);
    document.body.removeEventListener('mouseup',removeListeners,false);
    removeClass(key, "piano-key-active");


}


function clickKey (EO)  { // base function for mouse events
    EO=EO||window.event;       

    let key=EO.target||EO.srcElement; 
    let note = key.dataset.note;  

    if (note!==undefined)   {
        audioElems.clickSound(note);  
        addClassOrFill(key, null,"piano-key-active");
        key.addEventListener("mouseleave",removeListenerMouse);
        piano.addEventListener('mouseover',pendMouseLeave,false);
        document.body.addEventListener('mouseup',removeListeners,false);

    }

    
}


function setData (htmlcol) {    //writes data from html-collection (piano) to class objects

    htmlcol.forEach((item) =>  {

        if (item.dataset) {
            let note = item.dataset.note;
            let key = item.dataset.letter;
            let audio = audioElems.buildAudioElement(note);
            keyList.addLinks(key,audio);
        }

    });
}


  function switchFullScreen () {    //switched fullscreen

    let fullscreenEnabled = document.fullscreenElement;

    const htmlelem = document.documentElement;

        if (!fullscreenEnabled) {
            htmlelem.requestFullscreen();
            return;
        } else {
            document.exitFullscreen();
            return;
        }
}

function inscripter (changelem) {
    const butNot = document.querySelector(".btn-notes");
    const butLet =  document.querySelector(".btn-letters");
    const keyssharp = document.querySelector(".keys-sharp");

    if (changelem === butLet) {
        keyssharp.classList.add("piano-letter");
        piano.classList.add("piano-letter");
        butNot.classList.remove("btn-active");

    }  else {
        keyssharp.classList.remove("piano-letter");
        piano.classList.remove("piano-letter");
        butLet.classList.remove("btn-active");
    } 

}


function changeInscript (EO) {
    EO=EO||window.event;       
    let button = EO.target||EO.srcElement;
    const butInscript = document.querySelectorAll(".btn");
    console.log (button)
    if (button === butWrap){
        return
    }
    if (!button.classList.contains('btn-active')){
        button.classList.add ("btn-active");
        inscripter(button);
    }
    
    
}


    





const pianoKeys = document.querySelectorAll(".piano-key");

const piano = document.querySelector(".piano");

const butFull = document.querySelector(".fullscreen");

const butWrap = document.querySelector(".btn-container");

piano.addEventListener('mousedown',clickKey,false);

butWrap.addEventListener("click", changeInscript, false);






        setData(pianoKeys);
        butFull.onclick = switchFullScreen;




