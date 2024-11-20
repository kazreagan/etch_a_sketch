const container = document.getElementById("container");
const resizeButton = document.getElementById("resize-button");

let gridSize=16;

//function to create the grid
function createGrid(size) {
    container.innerHTML = "" //clear existing grid
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    const squareSize = 960 / size; //adjust square size dynamically
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        square.dataset.darkness = "0"//for progressive darkening

        //add hover effect
        square.addEventListener("mouseover", () => {
            //randomize rgb values
            const randomColor = `rgb(${random255()}, ${random255()}, ${random255()})`;

            //apply progressive darkening
            let darkness = parseFloat(square.dataset.darkness);
            if (darkness < 1) {
                darkness += 0.1;
                square.dataset.darkness = darkness.toFixed(1);
                square.style.backgroundColor = `rgba(0, 0, 0, ${darkness})`;
            } else {
                square.style.backgroundColor = randomColor;
            }
        });
        
        container.appendChild(square);
    }
}

//helper function for random rgb values
function random255() {
    return Math.floor(Math.random() * 256);
}

//resize grid functionality
resizeButton.addEventListener("click", () => {
    let newSize = parseInt(prompt("Enter the number of squares per side (max 100:"));
    if (newSize > 0 && newSize <= 100) {
        gridSize = newSize;
        createGrid(gridSize);
    }else {
        alert("Please enter a number between 1 and 100.");
    }
});

//initialize the grid
createGrid(gridSize)