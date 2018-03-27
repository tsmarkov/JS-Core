function cityMarkets(arr = []) {
    arr = arr.map(s => s.split(' -> '));

    let result = {};
    for (let i = 0; i < arr.length; i++) {
        arr[i][2] = arr[i][2].split(' : ').map(n => Number(n)).reduce((a, b) => a * b);

        let [town, product, totalIncome] = arr[i];

        if (!result.hasOwnProperty(town)) {
            result[town] = {};
        }

        if (!result[town].hasOwnProperty(product)) {
            result[town][product] = 0;
        }

        result[town][product] += totalIncome;
    }

    return Object.keys(result)
        .map(x => `Town - ${x}\n` +
            Object.keys(result[x])
                .map(y => `$$$${y} : ${result[x][y]}`)
                .join('\n'))
        .join('\n');
}