function diagonalSums(matrix) {
    let diagonal1 = 0;
    for (let i = 0; i < matrix.length; i++) {
        diagonal1 += matrix[i][i];
    }

    let diagonal2 = 0;
    let j = matrix.length - 1;
    for (let i = 0; i < matrix.length; i++) {
        diagonal2 += matrix[j][i];
        j--;
    }

    return `${diagonal1} ${diagonal2}`;
}

console.log(diagonalSums([[20, 40], [10, 60]]));
