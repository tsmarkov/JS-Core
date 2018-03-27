function firstAndLastKNumbers(numbers) {
    let k = numbers.splice(0, 1);

    let first = numbers.slice(0, k);
    let last = numbers.slice(numbers.length - k);

    return first.join(' ')
        .concat('\n')
        .concat(last.join(' '));
}

console.log(firstAndLastKNumbers([3, 6, 7, 8, 9]));