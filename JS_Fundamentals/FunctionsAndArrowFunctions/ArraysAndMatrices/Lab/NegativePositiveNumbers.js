function negativePositiveNumbers(numbers) {
    let newArray = [];

    for (let number of numbers) {
        if (number < 0) {
            newArray.unshift(number);
        } else {
            newArray.push(number);
        }
    }

    return newArray.join('\n');
}