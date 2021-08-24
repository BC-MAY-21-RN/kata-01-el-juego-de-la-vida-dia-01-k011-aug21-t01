const readFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        const matrix = fileToMatrix(content);
        handleAlgorithm(matrix);
    };
    reader.readAsText(file);
};
  
const showContent = (content) => {
    const element = document.getElementById('content-file');
    console.log(content);
    element.innerHTML = content;
};

const fileToMatrix = (file) => {
    const matrix = [];
    const fileLines = file.split('\n');    
    fileLines.forEach(line => {
        let characters = line.split('');
        // Extraer el salto de linea
        matrix.push(characters.filter(char => char != '\r'));
    });
    // Remover el texto de la primera linea
    matrix.shift();
    const rows = matrix.length;
    const cols = matrix[0].length;
    return {
        matrix,
        rows,
        cols
    };
};

/*
    Empieza el algoritmo
*/
const handleAlgorithm = (cellsInfo) => {
    console.log(cellsInfo);

    const matrix = cellsInfo.matrix;
    matrix.forEach((matrixRow, rowIndex) => {
        matrixRow.forEach((matrixCol, colIndex) => {
            // matrixCol es la casilla en la posicion [rowIndex][colIndex]
            firstRule(matrix, matrixCol, rowIndex, colIndex);
            secondRule(matrix, matrixCol, rowIndex, colIndex);
            thirdRule(matrix, matrixCol, rowIndex, colIndex);
            fourthRule(matrix, matrixCol, rowIndex, colIndex);

        });
    });

    //Imprimir la matriz
    let print = '';
    matrix.forEach((matrixRow, rowIndex) => {
        matrixRow.forEach((matrixCol, colIndex) => {
            print += matrixCol;
        });
        print += '\n';
    });    
    console.log(print);
};

const firstRule = (matrix, cellType, row, col) => {
    const neighbors = getNeighbors(matrix, row, col).filter(cell => cell === '*');
    if(cellType == '.') return;
    if(neighbors.length < 2) {
        // Muere
        matrix[row][col] = '.'
    }
};

// Obtener un array de los vecinos de una celula  
const getNeighbors = (matrix, row, col) => {
    let neighbors = [];
    // Comprobaciones
    if(row != 0) {
        // Si hay vecinos arriba
        const aboveNeighbors = matrix[row - 1].slice(col -1, col + 2);
        neighbors = [...aboveNeighbors];
    }
    if(row != matrix.length - 1) {
        // Si hay vecinos abajo
        const belowNeighbors = matrix[row + 1].slice(col - 1, col + 2);
        neighbors = [...neighbors, ...belowNeighbors];
    }
    if(col != 0) {
        // Si hay un vecino a la izquierda
        const leftNeighbor = matrix[row][col - 1];
        neighbors = [...neighbors, leftNeighbor];
    }
    if(col + 1 != matrix[0].length - 1) {
        // Si hay un vecino a la derecha
        const rightNeighbor = matrix[row][col + 1];
        neighbors = [...neighbors, rightNeighbor];
    }
    return neighbors;
};

const secondRule = (matrix, cellType, row, col) => {
    const neighbors = getNeighbors(matrix, row, col).filter(cell => cell === '*');
    if(cellType == '.') return;
    if(neighbors.length > 3) {
        // Muere
        matrix[row][col] = '.';
    }
};

const thirdRule = (matrix, cellType, row, col) => {
    const neighbors = getNeighbors(matrix, row, col).filter(cell => cell === '*');
    if(cellType == '.') return;
    if(neighbors.length === 3 || neighbors.length === 2) {
        // Vive
        matrix[row][col] = '*';
    }
};

const fourthRule = (matrix, cellType, row, col) => { 
    const neighbors = getNeighbors(matrix, row, col).filter(cell => cell === '*');
    if(cellType == '*') return;
    if(neighbors.length === 3) {
        matrix[row][col] = '*';
    }
}

document.getElementById('file-input').addEventListener('change', readFile, false);