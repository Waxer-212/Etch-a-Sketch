const gridContainer = document.querySelector('.grid-container');

const resetButton = document.querySelector('.clear');
const drawButton = document.querySelector('.draw');
const eraserButton = document.querySelector('.eraser');
const selectButton = document.querySelector('.select');
const rainbowButton = document.querySelector('.rainbow');
const shadeButton = document.querySelector('.shade');

const sliderValue = document.querySelector('.slider');
const slider_span = document.querySelectorAll('.slider-span');

const colorPicker = document.querySelector('#color-picker');

const hiddenDiv = document.querySelector('.hidden');

let randomColor = false;
let shadeColor = false;

let paintColor = 'black';

function createGrid() {

    const size = parseInt(sliderValue.value);
   
    gridContainer.innerHTML = '';
    
    let height = (gridContainer.clientHeight - 13) / size;
    let width = (gridContainer.clientWidth - 7) / size;
    
    console.log(height*size, gridContainer.clientHeight);
    console.log(width*size, gridContainer.clientWidth);

    for(let i = 0; i < size*size; i++) {
 
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.width = height + 'px';
            gridItem.style.height = width + 'px';
            gridContainer.appendChild(gridItem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
});

window.addEventListener('resize', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    createGrid();
});

sliderValue.addEventListener('input', () => {
    slider_span.forEach(span => {
        span.textContent = sliderValue.value;
    });
    createGrid();
});

let menu = document.querySelector('.controls');


menu.addEventListener('click', (event) => {
    let target = event.target;
    switch(target) {
        case resetButton:
            createGrid();
            break;
        case drawButton:
            paintColor = colorPicker.value;
            randomColor = false;
            shadeColor = false;
            break;
        case eraserButton:
            paintColor = 'white';
            randomColor = false;
            shadeColor = false;
            break;
        case selectButton:
            hiddenDiv.classList.toggle('hidden');
            break;
        case rainbowButton:
            randomColor = true;
            shadeColor = false;
            hiddenDiv.classList.toggle('hidden');
            break;
        case shadeButton:
            hiddenDiv.classList.toggle('hidden');
            shadeColor = true;
            randomColor = false;
            break;
    }
});

gridContainer.addEventListener('mouseover', (event) => {
    let target = event.target;
    if(target.classList.contains('grid-item')) {
        if(randomColor) {
            paintColor = getRanonColor();
        }
        else if(shadeColor) {
            paintColor = getShadeColor();
        }
        else if(paintColor === 'white') {
            target.style.backgroundColor = paintColor;
        }
        target.style.backgroundColor = paintColor;
    }
});

function getRanonColor() {
    
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
}

function getShadeColor() {
    
}







