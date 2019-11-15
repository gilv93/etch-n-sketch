const grid = document.querySelector('#grid');
const btn = document.querySelector('.btn');
const eraser = document.querySelector('.erase');
let gridSize = 256;


function createGrid() {
    for (let i=1; i <=gridSize; i++) {
        const container = document.createElement('div'); //makes one per use, cannot be out of loop or will only append once
        container.classList.add(`item${i}`)
        container.addEventListener('mouseover', turnBlack) //Is this more efficient than separate selector?
        grid.appendChild(container);
        }
    }

function turnBlack(e) {
          const transform = document.querySelector(`.${e.target.className}`);
          transform.style.backgroundColor='#1E1548';
    }

function newSize() {
    size = prompt("Choose a grid-size between 1-64:")
    if (0 < size && size <= 64 ) {
        for (let i=1; i <=gridSize; i++) {
            const child = document.querySelector('#grid > div'); //can I use querySelectorAll?
            grid.removeChild(child);
        }
        grid.style.cssText = `grid-template-columns: repeat(${size}, ${56/size}vh); grid-template-rows: repeat(${size}, ${56/size}vh)`
        gridSize = size * size
        createGrid();
    }
    else {
        alert("That's not a valid number, try again!");
    }
}

function eraseBoxes(e) {
    const erase = document.querySelector(`.${e.target.className}`);
    erase.style.backgroundColor='#FF2E4C';
}

function startErase() {
    const boxes = document.querySelectorAll('#grid > div');
    boxes.forEach(box => {
        box.addEventListener('mouseover', eraseBoxes);
        box.removeEventListener('mouseover', turnBlack);
    });
    eraser.addEventListener('click', endErase);
    eraser.removeEventListener('click', startErase);
    eraser.textContent="Eraser: On";
}

function endErase() {
    const boxes = document.querySelectorAll('#grid > div');
    boxes.forEach(box => {
        box.removeEventListener('mouseover', eraseBoxes);
        box.addEventListener('mouseover', turnBlack);
    });
    eraser.addEventListener('click', startErase);
    eraser.textContent="Eraser: Off";
}


createGrid();

btn.addEventListener('click', newSize);
eraser.addEventListener('click', startErase);



//const convert = document.querySelectorAll('#grid > div');
//convert.forEach(item => {
//    item.addEventListener('mouseover', turnBlack)
//});


