function rounding(arr) {
    if (arr[1] > 15) {
        arr[1] = 15;
    }

    return Number(arr[0].toFixed(arr[1]));
}