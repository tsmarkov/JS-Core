function compoundInterests(arr) {
    let [p, i, n, t] = arr;
    n = 12 / n;

    let f = p * (1 + (i / 100 / n)) ** (n * t);

    return f.toFixed(2);
}