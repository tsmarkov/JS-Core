function captureNumbers(arr) {
    let numbers = [];

    for (let str of arr) {
        let curentNumbers = str.match(/\d+/g)
        numbers = numbers.concat(curentNumbers);
    }

    return numbers.filter(e => e !== null && e !== '').map(m => m.trim()).join(' ');
}