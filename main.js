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
            console.log(matrixCol, rowIndex, colIndex);
            
        });
    });
};
  
document.getElementById('file-input').addEventListener('change', readFile, false);



    /*
    
Se empieza con una cuadrícula bidimensional de celdas, donde cada celda está viva o muerta. En esta versión del problema, la cuadrícula es finita y no puede haber vida fuera de los límites. Al calcular la siguiente generación de la cuadrícula, siga estas reglas:

Cualquier célula viva con menos de dos vecinos vivos muere, como si se tratara de una subpoblación.

Cualquier célula muerta con exactamente tres vecinos vivos se convierte en una célula viva\
Cualquier célula viva con más de tres vecinos vivos muere, como si estuviera causada por la superpoblación.

Cualquier célula viva con dos o tres vecinos vivos vive para la siguiente generación.


*célula   

........
....*... < muere Cualquier célula viva con menos de dos vecinos vivos muere, como si se tratara de una subpoblación.
...**...
........


........
...***.. < vive Cualquier célula muerta con exactamente tres vecinos vivos se convierte en una célula viva\
....*...
........

........
...****. < muere Cualquier célula viva con más de tres vecinos vivos muere, como si estuviera causada por la superpoblación
....*...
........

*/