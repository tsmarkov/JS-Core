function subsum(arr, start, end) {
    if (!Array.isArray(arr)) {
        return NaN;
    }

    let sum = 0;
    start = start < 0 ? 0 : start;
    end = end >= arr.length ? arr.length - 1 : end;

    for (let i = start; i <= end; i++) {
        sum += Number(arr[i]);
    }

    return sum;
}