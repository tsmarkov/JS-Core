function createOrbitMatrix(inputParams) {
    let [width, height, x, y] = inputParams;
    let matrix = [];

    for (let row = 0; row < height; row++) {
        matrix[row] = [];
        for (let col = 0; col < width; col++) {
            let currentIndexValue = 1 + Math.max(Math.abs(x - row), Math.abs(y - col));
            
            matrix[row][col] = currentIndexValue !== 1 ? currentIndexValue : 1;
        }
    }

    matrix.forEach(e => console.log(e.join(' ')));
}