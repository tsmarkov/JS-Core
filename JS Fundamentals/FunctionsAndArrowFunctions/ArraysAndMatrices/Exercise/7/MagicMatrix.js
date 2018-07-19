function magicMatrix(matrix) {
    let first = matrix[0].reduce((a, b) => a + b);

    for (let i = 1; i < matrix.length; i++) {
        let current = matrix[i].reduce((a, b) => a + b);

        if (first !== current) {
            return false;
        }
    }

    for (let col = 0; col < matrix[0].length; col++) {
        let sum = 0;
        for (let row = 0; row < matrix.length; row++) {
            sum += matrix[row][col];
        }

        if (first !== sum) {
            return false;
        }
    }

    return true;
}

console.log(magicMatrix([[1, 0, 0],
    [0, 0, 1],
    [0, 1, 0]]));