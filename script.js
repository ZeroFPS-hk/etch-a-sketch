const canvas = document.querySelector(".canvas");
const sizeInput = document.querySelector("#sizeInput");
const sizeButton = document.querySelector("#sizeButton");
const colorSelect = document.querySelector("#colorSelect");
const gridToggle = document.querySelector("#gridToggle");
const canvasReset = document.querySelector("#canvasReset");

let currentColor = "red";
let mouseDown = false;
let gridEnabled = true;

window.onload = createCanvas(16);
window.onmousedown = ()=> mouseDown = true;
window.onmouseup = ()=> mouseDown = false;

sizeButton.addEventListener("click", ()=>(createCanvas(sizeInput.value)));
colorSelect.addEventListener("change", ()=>(currentColor = colorSelect.value));
gridToggle.addEventListener("click", toggleGrid);
canvasReset.addEventListener("click", resetCanvas);

function createCanvas(size=16){
    size = checkSize(size);
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
    canvasSquare.addEventListener("mouseover", colorCanvasSquare);
    rowContainer.appendChild(canvasSquare);
}

function colorCanvasSquare(e){
    if(mouseDown) e.target.style.background = currentColor;
}

function checkSize(size){
    if(isNaN(size)){
        alert("Please enter a number.");
        return false;
    }

    size = Math.floor(size);
    if(size<=0){
        alert("Please enter a positive interger.");
        return false;
    }

    return size > 100? 100: size;
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

function resetCanvas(){
    const canvasSquares = Array.from(document.querySelectorAll(".canvasSquare"));
    for(const canvasSquare of canvasSquares){
        canvasSquare.style.background = "white";
    }
}