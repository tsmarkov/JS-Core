function printArrayWithDelimeter(arr) {
    let delimiter = arr.splice(arr.length - 1);

    return arr.join(delimiter);
}