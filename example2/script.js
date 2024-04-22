const data = [
    {
      "id": "A",
      "columns": [
        { "id": "A1", "disabled": false },
        { "id": "A2", "disabled": false },
        { "id": "A3", "disabled": false },
        { "id": "A4", "disabled": false },
        { "id": "A5", "disabled": false },
        { "id": "A6", "disabled": false },
        { "id": "A7", "disabled": false },
        { "id": "A8", "disabled": false },
        { "id": "A9", "disabled": false },
        { "id": "A10", "disabled": false }
      ]
    },
    {
      "id": "B",
      "columns": [
        { "id": "B1", "disabled": false },
        { "id": "B2", "disabled": false },
        { "id": "B3", "disabled": false },
        { "id": "B4", "disabled": false },
        { "id": "B5", "disabled": false },
        { "id": "B6", "disabled": false },
        { "id": "B7", "disabled": false },
        { "id": "B8", "disabled": false },
        { "id": "B9", "disabled": false },
        { "id": "B10", "disabled": false }
      ]
    },
    {
      "id": "C",
      "columns": [
        { "id": "C1", "disabled": false },
        { "id": "C2", "disabled": false },
        { "id": "C3", "disabled": false },
        { "id": "C4", "disabled": false },
        { "id": "C5", "disabled": false },
        { "id": "C6", "disabled": false },
        { "id": "C7", "disabled": false },
        { "id": "C8", "disabled": false },
        { "id": "C9", "disabled": false },
        { "id": "C10", "disabled": false }
      ]
    },
    {
      "id": "D",
      "columns": [
        { "id": "D1", "disabled": false },
        { "id": "D2", "disabled": false },
        { "id": "D3", "disabled": false },
        { "id": "D4", "disabled": false },
        { "id": "D5", "disabled": false },
        { "id": "D6", "disabled": false },
        { "id": "D7", "disabled": false },
        { "id": "D8", "disabled": false },
        { "id": "D9", "disabled": false },
        { "id": "D10", "disabled": false }
      ]
    },
    {
      "id": "E",
      "columns": [
        { "id": "E1", "disabled": false },
        { "id": "E2", "disabled": false },
        { "id": "E3", "disabled": false },
        { "id": "E4", "disabled": false },
        { "id": "E5", "disabled": false },
        { "id": "E6", "disabled": false },
        { "id": "E7", "disabled": false },
        { "id": "E8", "disabled": false },
        { "id": "E9", "disabled": false },
        { "id": "E10", "disabled": false }
      ]
    },
    {
      "id": "F",
      "columns": [
        { "id": "F1", "disabled": false },
        { "id": "F2", "disabled": false },
        { "id": "F3", "disabled": false },
        { "id": "F4", "disabled": false },
        { "id": "F5", "disabled": false },
        { "id": "F6", "disabled": false },
        { "id": "F7", "disabled": false },
        { "id": "F8", "disabled": false },
        { "id": "F9", "disabled": false },
        { "id": "F10", "disabled": false }
      ]
    },
    {
      "id": "G",
      "columns": [
        { "id": "G1", "disabled": false },
        { "id": "G2", "disabled": false },
        { "id": "G3", "disabled": false },
        { "id": "G4", "disabled": false },
        { "id": "G5", "disabled": false },
        { "id": "G6", "disabled": false },
        { "id": "G7", "disabled": false },
        { "id": "G8", "disabled": false },
        { "id": "G9", "disabled": false },
        { "id": "G10", "disabled": false }
      ]
    },
    {
      "id": "H",
      "columns": [
        { "id": "H1", "disabled": false },
        { "id": "H2", "disabled": false },
        { "id": "H3", "disabled": false },
        { "id": "H4", "disabled": false },
        { "id": "H5", "disabled": false },
        { "id": "H6", "disabled": false },
        { "id": "H7", "disabled": false },
        { "id": "H8", "disabled": false },
        { "id": "H9", "disabled": false },
        { "id": "H10", "disabled": false }
      ]
    }
  ]

let currentPlayerId = 2;
let currentValue = getRandomNumber()
const fragment = document.createDocumentFragment();

function getIndices(classArray) {
  let xy = { x: -1, y: -1 };
  $(classArray).each(function(e) {
    // get the column
    const colindex = classArray[e].split(/col/);
    if (colindex.length > 1) {
      xy.x = colindex[1];
    }
    // get the row
    const rowindex = classArray[e].split(/row/);
    if (rowindex.length > 1) {
      xy.y = rowindex[1];
    }
  });
  // object contains x,y
  return xy;
}

function getPlayerId(classArray) {
    const playerClass = classArray.find(c => c.includes('player'))
    return playerClass && playerClass.split('player')[1]
}

function hexclick(e) {
  // find out on what element was clicked
  const classes = e.target.className.split(/\s+/);
  const xy = getIndices(classes);
  

  const id = convertToId(xy.x * 1, xy.y * 1)
  console.log(id);
  $(`#${id}-value`).html(`${currentValue}`)
  const siblings = getSiblings(xy.x * 1, xy.y * 1)
  for (const sibling of siblings) {
    
    const id = convertToId(sibling.x, sibling.y)
    const siblingElement = $(`#${id}`)
    const siblingClasses = document.getElementById(id).className.split(/\s+/)
    const playerId = getPlayerId(siblingClasses)

    const siblingValue = document.getElementById(`${id}-value`).innerHTML
    if(siblingValue && playerId !== currentPlayerId){
        if((siblingValue * 1) < currentValue){
            siblingElement.removeClass(`player${playerId}`)
            siblingElement.addClass(`player${currentPlayerId}`)
        }
    }
    
    // $(`#${id}`).toggleClass('sibling')

  }
  // console.log(board[xy.x][xy.y])
  $(e.target).toggleClass(`beard player${currentPlayerId}`);
  tooglePlayerIdChange()
  loadNewValue()
}

function loadNewValue() {
    currentValue = getRandomNumber()
    $('#current-value').html(currentValue)   
}

function getSiblings(indexX, indexY) {
    let result = indexX % 2 === 0 ?
     [
        {
            x: indexX - 1,
            y: indexY
        },
        {
            x: indexX - 1,
            y: indexY + 1
        },
        {
            x: indexX,
            y: indexY - 1
        },
        {
            x: indexX,
            y: indexY + 1
        },
        {
            x: indexX + 1,
            y: indexY
        },
        {
            x: indexX + 1,
            y: indexY + 1
        }
    ] : [
        {
            x: indexX - 1,
            y: indexY
        },
        {
            x: indexX - 1,
            y: indexY - 1
        },
        {
            x: indexX,
            y: indexY - 1
        },
        {
            x: indexX,
            y: indexY + 1
        },
        {
            x: indexX + 1,
            y: indexY
        },
        {
            x: indexX + 1,
            y: indexY - 1
        }
    ]
    return result.filter(s => s.x >= 0 && s.y >= 0)
}

function convertToId(indexX, indexY){
    return `${String.fromCharCode(65+indexX)}${indexY}`
}

// ----------------------------------------------
function createRow(h, even_or_odd) {
  const ol = document.createElement('ol');
  if (even_or_odd === 'even' || even_or_odd === true) {
    $(ol).addClass('even');
  } else {
    $(ol).addClass('odd');
  }
  // console.log(ol)
  return ol;
}

function createColumns(col, row, ol) {
  const el = document.createElement('li');
  const text = document.createElement('div')
  $(text).addClass('text');

  $(text).attr('id', convertToId(col, row) + '-value')
  $(el).addClass('hex');
  $(el).addClass('col' + col);
  $(el).addClass('row' + row);
  $(el).attr('id', convertToId(col, row))
  
el.appendChild(text)
  ol.appendChild(el);
  return el;
}

function createBoard(w, h) {
  const board = [];
  const fragment = document.createDocumentFragment();
  // create all rows
  for (let rownum = 0; rownum < h; rownum++) {
    const row = createRow(rownum, rownum % 2 === 0);
    board[rownum] = [];
    // create all columns
    for (let colnum = 0; colnum < w; colnum++) {
      const col = createColumns(rownum, colnum, row);
      board[rownum][colnum] = {
        hex: col,
      };
      $(col).click(hexclick);
    }
    fragment.appendChild(row);
  }

  $('#board').append(fragment);
  // console.log("created board.")
  loadNewValue()
  tooglePlayerIdChange()
  return board;
}

const board = createBoard(10, 8);
// console.log(board)

function getRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
}

function tooglePlayerIdChange() {
    currentPlayerId = currentPlayerId === 1 ? 2 : 1
    $('#current-player').html(`|   player turn: ${currentPlayerId}`)
}