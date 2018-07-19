function calculateDistance(arr) {
    arr[2] /= 3600;

    let s1 = arr[0] * arr[2];
    let s2 = arr[1] * arr[2];

    return Math.abs(s1 - s2) * 1000;
}