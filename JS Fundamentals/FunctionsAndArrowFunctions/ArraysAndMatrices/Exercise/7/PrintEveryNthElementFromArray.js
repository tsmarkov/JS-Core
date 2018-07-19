function printEveryNthElement(arr) {
    let step = Number(arr.splice(arr.length - 1));

    for (let i = 0; i < arr.length; i += step) {
        console.log(arr[i]);
    }
}
