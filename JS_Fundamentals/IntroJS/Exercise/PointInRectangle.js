function pointInRectangle(numbers) {
    let [x, y, xMin, xMax, yMin, yMax] = numbers;

    return ((x >= xMin && x <= xMax) && (y >= yMin && y <= yMax)) ? 'inside' : 'outside';
}