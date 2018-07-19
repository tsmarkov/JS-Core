function sqareOfStars(n) {
    let square = '';

    for (let i = 0; i < n; i++) {
        square += '* '.repeat(n);
        square += '\n';
    }

    return square;
}

console.log(sqareOfStars(5));