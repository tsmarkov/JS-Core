function aggregate(arr) {
    let sum = reduce(arr, (a, b) => a + b);
    let min = reduce(arr, () => Math.min(...arr));
    let max = reduce(arr, () => Math.max(...arr));
    let product = reduce(arr, (a, b) => a * b);
    let join = reduce(arr, (a, b) => '' + a + b);

    console.log(`Sum = ${sum}`);
    console.log(`Min = ${min}`);
    console.log(`Max = ${max}`);
    console.log(`Product = ${product}`);
    console.log(`Join = ${join}`);

    function reduce(arr, func) {
        let result = arr[0];
        for (let i = 1; i < arr.length; i++) {
            result = func(result, arr[i]);
        }
        return result;
    }
}

aggregate([1, 2, 3, 4, 5])