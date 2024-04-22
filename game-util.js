const gameData = require("./data.json");

const rowIndexes = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};

const rowIndexesStr = "ABCDEFGH";

function findColumn(columnId, data) {
  const rowId = columnId[0];
  const row = data.find((row) => row.id === rowId);
  if (row) {
    return row.columns.find((column) => column.id === columnId);
  }
}

function getSiblingColumn(columnId, data) {
  const rowId = columnId[0];
  const rowIdNumber = rowIndexes[rowId];
  const columnIdNumber = columnId[1] * 1;

  const siblingIds = rowIdNumber % 2 === 0 ? [
    `${rowIndexesStr[rowIdNumber - 1]}${columnIdNumber}`,
    `${rowIndexesStr[rowIdNumber - 1]}${columnIdNumber + 1}`,
    `${rowIndexesStr[rowIdNumber]}${columnIdNumber - 1}`,
    `${rowIndexesStr[rowIdNumber]}${columnIdNumber + 1}`,
    `${rowIndexesStr[rowIdNumber + 1]}${columnIdNumber}`,
    `${rowIndexesStr[rowIdNumber + 1]}${columnIdNumber + 1}`,
  ] : [
    `${rowIndexesStr[rowIdNumber - 1]}${columnIdNumber}`,
    `${rowIndexesStr[rowIdNumber - 1]}${columnIdNumber + 1}`,
    `${rowIndexesStr[rowIdNumber]}${columnIdNumber - 1}`,
    `${rowIndexesStr[rowIdNumber]}${columnIdNumber + 1}`,
    `${rowIndexesStr[rowIdNumber + 1]}${columnIdNumber - 1}`,
    `${rowIndexesStr[rowIdNumber + 1]}${columnIdNumber}`,
  ];

  const siblings = siblingIds
    .map((sId) => findColumn(sId, data))
    .filter((s) => s);

  return siblings;
}


const siblings = getSiblingColumn('B1', gameData)
console.log(siblings);
