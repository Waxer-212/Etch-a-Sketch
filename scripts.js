//Getting the elements
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

let paintColor = colorPicker.value;

//Creating the grid
function createGrid() {

    //Getting the size of the grid
    const size = parseInt(sliderValue.value);
   
    //Clearing the grid
    gridContainer.innerHTML = '';
    
    //Setting the height and width of the grid items
    let height = (gridContainer.clientHeight - 13) / size;
    let width = (gridContainer.clientWidth - 7) / size;

    //Creating the grid items
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

sliderValue.addEventListener('input', () => {
    slider_span.forEach(span => {
        span.textContent = sliderValue.value;
    });
    createGrid();
});

//Adding event listeners to the buttons
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
            selectButton.classList.add('hidden');
            break;

        case rainbowButton:
            randomColor = true;
            shadeColor = false;
            hiddenDiv.classList.toggle('hidden');
            selectButton.classList.remove('hidden');
            break;

        case shadeButton:
            shadeColor = true;
            randomColor = false;
            hiddenDiv.classList.toggle('hidden');
            selectButton.classList.remove('hidden');
            break;
    }
});

gridContainer.addEventListener('mouseover', (event) => {
    let target = event.target;
    if(target.classList.contains('grid-item')) {
        if(randomColor) {
            paintColor = getRandomColor();
        }
        if(shadeColor) {
            if(target.style.backgroundColor === null || target.style.backgroundColor === '') 
                paintColor = '#f5f5f5';
             else
                paintColor = rgbToHex(target.style.backgroundColor);
        
            paintColor = getShadeColor();
        }
        target.style.backgroundColor = paintColor;
    }
});

function getRandomColor() {
    
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
}

    function rgbToHex(rgb) {
        let result = rgb.match(/\d+/g);
        return "#" + ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2])).toString(16).slice(1).toUpperCase();
    }
    
    function getShadeColor() {
        let color = paintColor;
        let usePound = false;

        if (color[0] == "#") {
            color = color.slice(1);
            usePound = true;
        }

        let num = parseInt(color, 16);

        let r = (num >> 16) - 25;
        let g = ((num >> 8) & 0x00FF) - 25;
        let b = (num & 0x0000FF) - 25;

        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;

        let newColor = (r << 16) | (g << 8) | b;
        return (usePound ? "#" : "") + newColor.toString(16).padStart(6, '0');
    }








