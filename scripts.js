const gridContainer = document.querySelector('.grid-container');
const resetButton = document.querySelector('.reset');
const normalSizeButton = document.querySelector('.normal');

function calculateBoxSize(numRows,numCols) {
    const gridContainerWidth = gridContainer.clientWidth;
    const gridContainerHeight = gridContainer.clientHeight;

    const boxWidth = (gridContainerWidth - numCols*2) / numCols;
    const boxHeight = (gridContainerHeight - numRows*2) / numRows;

    return {boxWidth, boxHeight};
}

function createGrid(numRows,numCols) {
    for(let i = 0; i < numRows; i++) {
        for(let j = 0; j < numCols; j++)
        {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.style.backgroundColor = 'gray';

            const {boxWidth, boxHeight} = calculateBoxSize(numRows,numCols);
            gridItem.style.width = `${boxWidth}px`;
            gridItem.style.height = `${boxHeight}px`;
            

            gridContainer.appendChild(gridItem);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createGrid(30,30);
});

window.addEventListener('resize', () => {
    const gridItems = document.querySelectorAll('.grid-item');
    const {boxWidth, boxHeight} = calculateBoxSize(30,30);

    gridItems.forEach(gridItem => {
        gridItem.style.width = `${boxWidth}px`;
        gridItem.style.height = `${boxHeight}px`;
    });
});

