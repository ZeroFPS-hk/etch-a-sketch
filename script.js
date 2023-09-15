const canvas = document.querySelector(".canvas");
let currentColor = "red";
let mouseDown = false;

window.onload = createCanvas(16);
window.onmousedown = ()=> mouseDown = true;
window.onmouseup = ()=> mouseDown = false;

function createCanvas(size=16){
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
    canvasSquare.classList.add("canvasSquare");
    canvasSquare.addEventListener("mouseover", colorCanvasSquare);
    rowContainer.appendChild(canvasSquare);
}

function colorCanvasSquare(e){
    if (mouseDown)
        e.target.style.background = currentColor;
}