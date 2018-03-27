function processOddNumbers(numbers) {
    return numbers
        .filter((el, i) => i % 2 !== 0)
        .map(el => el * 2)
        .reverse();
}