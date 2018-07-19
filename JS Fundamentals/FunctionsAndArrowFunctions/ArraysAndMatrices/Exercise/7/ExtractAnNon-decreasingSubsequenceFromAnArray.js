function extract(arr) {
    let j = arr[0];

    let result = [j];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] >= j) {
            result.push(arr[i]);
            j = arr[i];
        }
    }

    return result.join('\n ');
}

console.log(extractThatBitches([20, 3, 2, 15, 6, 1]));