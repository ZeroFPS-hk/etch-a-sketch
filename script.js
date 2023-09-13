const canvas = document.querySelector(".canvas");

function createCanvas(size=16){
    let rowContainer, canvasSquare;
    for(let i=0; i<size; i++){
        rowContainer = document.createElement("div");
        rowContainer.classList.add("rowContainer");

        for(let j=0; j<size; j++){
            canvasSquare = document.createElement("div");
            canvasSquare.classList.add("canvasSquare");
            rowContainer.appendChild(canvasSquare);
        }
        canvas.appendChild(rowContainer);
    }
}