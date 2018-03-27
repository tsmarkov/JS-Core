function quadraticEquation(a, b, c) {
    let d = (b ** 2) - (4 * a * c);

    let output = [];

    if (d > 0) {
        let firstRoot = (-b + Math.sqrt(d)) / (2 * a);
        let secondRoot = (-b - Math.sqrt(d)) / (2 * a);

        output[0] = firstRoot < secondRoot ? firstRoot : secondRoot;
        output[1] = secondRoot > firstRoot ? secondRoot : firstRoot;
    } else if (d === 0) {
        let root = -b / (2 * a);

        output[0] = root;
    } else if (d < 0) {
        output[0] = 'No';
    }

    for (let obj of output) {
        console.log(obj);
    }
}