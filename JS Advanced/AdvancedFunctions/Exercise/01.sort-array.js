function solve(arr = [], arg) {
    let sortArr = (function () {
        return {
            asc: (arr) => {
                arr.sort((a, b) => a - b)
            },
            desc: (arr) => {
                arr.sort((a, b) => b - a);
            }
        }
    })();

    sortArr[arg](arr);
    return arr;
}

console.log(solve([14, 7, 17, 6, 8], 'asc'));
console.log(solve([14, 7, 17, 6, 8], 'desc'));
