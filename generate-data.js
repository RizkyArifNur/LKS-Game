const fs = require('fs')
const data = []

const rowIndexes = 'ABCDEFGH'
for (let row = 1; row <= 8; row++) {
    const rowId = rowIndexes[row - 1]
    const columns = []
    for (let column = 1; column <= 10; column++) {
        columns.push({
            id: rowId + column,
            value: undefined,
            disabled: false,
            playerId: undefined
        })
    }
    let rowData = {
        id: rowId,
        columns
    }
    data.push(rowData)
}


fs.writeFileSync('data.json', JSON.stringify(data))