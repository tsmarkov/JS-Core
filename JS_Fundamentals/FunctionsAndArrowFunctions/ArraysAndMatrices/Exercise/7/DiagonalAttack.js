function diagonalAttack(matrix) {
    matrix = parseMatrix(matrix);
    let diagonal1 = diagonal1Sum(matrix);
    let diagonal2 = diagonal2Sum(matrix);

    if (diagonal1 === diagonal2) {
        attackNotDiagonals(matrix, diagonal1)
            .forEach(e =>
                console.log(e.join(' ')));
    } else {
        matrix.forEach(e =>
            console.log(e.join(' ')));
    }

    function attackNotDiagonals(matrix, sum) {
        let newMatrix = [];

        for (let row = 0; row < matrix.length; row++) {
            newMatrix[row] = [];
            for (let col = 0; col < matrix[row].length; col++) {
                if (row === col || (row + col === matrix.length - 1)) {
                    newMatrix[row][col] = matrix[row][col];
                } else {
                    newMatrix[row][col] = sum;
                }
            }
        }

        return newMatrix;
    }

    function parseMatrix(matrix) {
        let newMatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            newMatrix[i] = matrix[i].split(' ').map(n => Number(n));
        }
        return newMatrix;
    }

    function diagonal1Sum(matrix) {
        let sum = 0;
        for (let row = 0, col = 0; row < matrix.length && col < matrix[row].length; row++ , col++) {
            sum += matrix[row][col];
        }
        return sum;
    }

    function diagonal2Sum(matrix) {
        let sum = 0;
        for (let row = 0, col = matrix[row].length - 1; row < matrix.length && col >= 0; row++ , col--) {
            sum += matrix[row][col];
        }
        return sum;
    };
}
