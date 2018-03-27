function naj_golqmataBoza(arr = []) {
    arr = arr.map(e => Number(e));

    let biggestProduct = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        let number = arr[i];
        if (number >= 0 && number < 10) {
            let currentProduct = 1;
            for (let j = i + 1, k = 0; k < number && j < arr.length; j++, k++) {
                currentProduct *= arr[j];
            }

            if (currentProduct > biggestProduct) {
                biggestProduct = currentProduct;
            }
        }
    }

    return biggestProduct;
}

console.log(
    naj_golqmataBoza([
        18,
        42,
        19,
        36,
        1,
        -297,
        38,
        100,
        9,
        -249,
        -170,
        -18,
        -208,
        -11,
        -87,
        -90,
        -286,
        -27
    ])
);