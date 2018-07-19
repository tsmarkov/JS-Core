function modifyAverage(n) {

    while (averageOfDigits(n) <= 5) {
        n += '' + '9';
    }

    return n;

    function averageOfDigits(n) {
        let number = n.toString();
        let average = 0;

        for (let digit of number) {
            average += parseInt(digit);
        }

        return average / number.length;
    }
}

console.log(modifyAverage(202));
