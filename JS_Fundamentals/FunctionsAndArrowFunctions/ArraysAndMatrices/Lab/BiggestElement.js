function biggestElementInMatrix(matrix) {
    return Math.max(...matrix.sort((arr1, arr2) => Math.max(...arr2) - Math.max(...arr1))[0]);
}

