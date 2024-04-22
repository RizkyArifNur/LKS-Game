const data = require('../data.json')
function getSiblings(data, targetRow, targetColumn) {
    // Find the index of the target hexagon in the data array
    const targetHexagonIndex = data.findIndex(hexagon => hexagon.id === `${targetRow}${targetColumn}`);

    // Define the relative positions of neighboring hexagons
    const neighbors = [
        { rowOffset: 0, colOffset: -1 },  // West
        { rowOffset: 0, colOffset: 1 },   // East
        { rowOffset: -1, colOffset: targetColumn % 2 === 0 ? 0 : 1 }, // North
        { rowOffset: 1, colOffset: targetColumn % 2 === 0 ? 0 : 1 }, // South
        { rowOffset: -1, colOffset: targetColumn % 2 === 0 ? -1 : 0 }, // Northwest
        { rowOffset: -1, colOffset: targetColumn % 2 === 0 ? 1 : 0 }, // Northeast
        { rowOffset: 1, colOffset: targetColumn % 2 === 0 ? -1 : 0 }, // Southwest
        { rowOffset: 1, colOffset: targetColumn % 2 === 0 ? 1 : 0 } // Southeast
    ];

    const siblings = [];

    // Loop through the relative positions and find the corresponding hexagon
    for (const neighbor of neighbors) {
        const row = String.fromCharCode(targetRow.charCodeAt(0) + neighbor.rowOffset);
        const column = targetColumn + neighbor.colOffset;
        console.log(`${row}${column}`);
        const siblingHexagon = data.find(hexagon => hexagon.id === `${row}${column}`);
        if (siblingHexagon) {
            siblings.push(siblingHexagon);
        }
    }

    return siblings;
}

// Example usage
const targetRow = 'A';
const targetColumn = 1;
const siblings = getSiblings(data, targetRow, targetColumn);
console.log(siblings);
