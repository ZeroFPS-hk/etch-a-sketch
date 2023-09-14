const canvas = document.querySelector(".canvas");

window.onload = createCanvas(16);

function createCanvas(size=16){
    canvas.replaceChildren();
    let rowContainer, canvasSquare;
    for(let i=0; i<size; i++){
        rowContainer = document.createElement("div");
        rowContainer.classList.add("rowContainer");

        for(let j=0; j<size; j++){
            canvasSquare = document.createElement("div");
            canvasSquare.classList.add("canvasSquare");
            canvasSquare.addEventListener("mouseover", (e) => e.target.style.background="red");
            rowContainer.appendChild(canvasSquare);
        }
        canvas.appendChild(rowContainer);
    }
}