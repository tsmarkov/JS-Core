function triangleOfStars(n) {
    let triangle = '';

    for (let i = 1; i <= n; i++) {
        triangle += '*'.repeat(i);
        triangle += '\n';
    }

    for (let i = n - 1; i > 0; i--) {
        triangle += '*'.repeat(i);
        triangle += '\n';
    }

    return triangle;
}

console.log(triangleOfStars(8));