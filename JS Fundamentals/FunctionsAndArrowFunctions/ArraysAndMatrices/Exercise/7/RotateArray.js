function rotateArray(arr) {
    let c = arr.splice(arr.length - 1) % arr.length;

    for (let i = 0; i < c; i++) {
        arr.unshift(arr.pop());
    }

    return arr.join(' ');
}

console.log(rotateArray([1, 2, 3, 4, 5, 2]));

