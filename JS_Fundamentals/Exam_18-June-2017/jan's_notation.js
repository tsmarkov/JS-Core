function parseAndCalc(arr = []) {
    let numbers = [];

    for (let element of arr) {
        if (Number.isInteger(element)) {
            numbers.push(element);
        } else {
            let num2 = numbers.pop();
            let num1 = numbers.pop();

            let result = execute(num1, num2, element);
            numbers.push(result);
        }
    }

    if (numbers.length > 1) {
        numbers.fill('Error: too many operands!');
    } else if (Number.isNaN(numbers[0])) {
        numbers.fill('Error: not enough operands!');
    }

    return numbers[0];

    function execute(a, b, operand) {
        switch (operand) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
        }
    }
}

console.log(parseAndCalc([3, 4, '+']));
console.log(parseAndCalc([5, 3, 4, '*', '-']));
console.log(parseAndCalc([7, 33, 8, '-']));
console.log(parseAndCalc([15, '/']));
console.log(parseAndCalc([31, 2, '+', 11, '/']));
console.log(parseAndCalc([-1, 1, '+', 101, '*', 18, '+', 3, '/']));