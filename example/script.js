document.addEventListener('DOMContentLoaded', function() {
    const hexGrid = document.getElementById('hexGrid');
    const hexes = [];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 8; j++) {
            const hex = document.createElement('div');
            hex.className = 'hex';
            hex.dataset.row = i;
            hex.dataset.col = j;
            hex.addEventListener('click', handleClick);
            hexGrid.appendChild(hex);
            hexes.push(hex);
        }
    }

    let currentPlayer = 1;
    let gameEnded = false;

    function handleClick(event) {
        if (gameEnded) return;
        const hex = event.target;
        const row = parseInt(hex.dataset.row);
        const col = parseInt(hex.dataset.col);

        if (!hex.dataset.value) {
            const value = Math.floor(Math.random() * 20) + 1;
            hex.dataset.value = value;
            hex.style.backgroundColor = currentPlayer === 1 ? 'blue' : 'red';

            // Check for take over
            const neighbors = getNeighbors(row, col);
            neighbors.forEach(neighbor => {
                const neighborHex = hexes.find(h => h.dataset.row == neighbor.row && h.dataset.col == neighbor.col);
                if (neighborHex && neighborHex.dataset.value && parseInt(neighborHex.dataset.value) < value) {
                    neighborHex.dataset.value = value;
                    neighborHex.style.backgroundColor = currentPlayer === 1 ? 'blue' : 'red';
                }
            });

            currentPlayer = currentPlayer === 1 ? 2 : 1;

            // Check for game end
            if (hexes.every(hex => hex.dataset.value)) {
                gameEnded = true;
                calculateScore();
            }
        }
    }

    function getNeighbors(row, col) {
        return [
            { row: row - 1, col: col },
            { row: row + 1, col: col },
            { row: row, col: col - 1 },
            { row: row, col: col + 1 },
            { row: row - 1, col: col + 1 },
            { row: row + 1, col: col - 1 }
        ];
    }

    function calculateScore() {
        let player1Score = 0;
        let player2Score = 0;
        hexes.forEach(hex => {
            const value = parseInt(hex.dataset.value);
            if (!isNaN(value)) {
                if (hex.style.backgroundColor === 'blue') {
                    player1Score += value;
                } else if (hex.style.backgroundColor === 'red') {
                    player2Score += value;
                }
            }
        });
        console.log('Player 1 Score:', player1Score);
        console.log('Player 2 Score:', player2Score);
    }
});
