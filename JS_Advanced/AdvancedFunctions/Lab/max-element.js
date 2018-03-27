function solve(numbers) {
    let saveMaxElement = (function () {
        let maxElement = -Infinity;
        return {
            isBigger: (value) => {
                if (maxElement < value) {
                    maxElement = value;
                }
            },

            getMax: () => {
                return maxElement;
            }
        }
    })();

    for (let number of numbers) {
        saveMaxElement.isBigger(number);
    }

    return saveMaxElement.getMax();
}

console.log(solve([1, 44, 123, 33]));