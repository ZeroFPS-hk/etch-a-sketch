const DEFAULT_CANVAS_SIZE = 16;
const MAX_CANVAS_SIZE = 100;

const canvas = document.querySelector(".canvas");
const sizeInput = document.querySelector("#sizeInput");
const sizeButton = document.querySelector("#sizeButton");
const colorSelect = document.querySelector("#colorSelect");
const gridToggle = document.querySelector("#gridToggle");
const canvasReset = document.querySelector("#canvasReset");

let currentColor = colorSelect.value;
let mouseDown = false;
let gridEnabled = true;

window.onload = ()=> createCanvas(DEFAULT_CANVAS_SIZE);
window.onmousedown = ()=> mouseDown = true;
window.onmouseup = ()=> mouseDown = false;
//prevents dragging ability of browser which messes up with mouse down/up checks
window.addEventListener("dragstart", (e)=>e.preventDefault());

sizeButton.addEventListener("click", ()=>(createCanvas(sizeInput.value)));
colorSelect.addEventListener("change", ()=>(currentColor = colorSelect.value));
gridToggle.addEventListener("click", toggleGrid);
canvasReset.addEventListener("click", resetCanvas);



function createCanvas(size=DEFAULT_CANVAS_SIZE){
    size = validateSize(size);
    if(!size) return;
    canvas.replaceChildren();
    let rowContainer;
    for(let i=0; i<size; i++){
        rowContainer = document.createElement("div");
        rowContainer.classList.add("rowContainer");

        for(let j=0; j<size; j++){
            createCanvasSquare(rowContainer, size);
        }
        canvas.appendChild(rowContainer);
    }
}

function createCanvasSquare(rowContainer, size){
    const canvasSquare = document.createElement("div");
    canvasSquare.style.width = `${canvas.clientWidth / size}px`;
    canvasSquare.style.height = `${canvas.clientHeight / size}px`;
    canvasSquare.classList.add("canvasSquare");
    if(gridEnabled) canvasSquare.classList.add("grid");
    canvasSquare.addEventListener("mouseover", colorOnHold);
    canvasSquare.addEventListener("mousedown", colorOnClick);
    rowContainer.appendChild(canvasSquare);
}

function colorOnHold(e){
    if(mouseDown) e.target.style.background = currentColor;
}

//colorOnHold does not color first square clicked since mouse is already over the square before it clicks down.
//So we need a seperate function.
function colorOnClick(e){
    e.target.style.background = currentColor;
}

function validateSize(size){
    if(isNaN(size)){
        alert("Please enter a number.");
        return false;
    }

    size = Math.floor(size);
    if(size<=0){
        alert("Please enter a positive interger.");
        return false;
    }

    return size > MAX_CANVAS_SIZE? MAX_CANVAS_SIZE: size;
}

function toggleGrid(){
    gridEnabled = !gridEnabled;
    gridToggle.textContent = gridEnabled? "ON" : "OFF";
    gridToggle.style.background = gridEnabled? "lime" : "pink";
    const canvasSquares = Array.from(document.querySelectorAll(".canvasSquare"));
    for(const canvasSquare of canvasSquares){
        canvasSquare.classList.toggle("grid");
    }
}

//for when you accidentally changed canvas size but want to reset canvas with current size
function resetCanvas(){
    const canvasSquares = Array.from(document.querySelectorAll(".canvasSquare"));
    for(const canvasSquare of canvasSquares){
        canvasSquare.style.background = canvas.style.backgroundColor;
    }
}