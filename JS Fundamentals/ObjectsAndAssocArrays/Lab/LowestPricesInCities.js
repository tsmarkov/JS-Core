function lowestPricesInCities(arr = []) {
    arr = arr.map(s => s.split(' | '));

    let result = {};
    for (let i = 0; i < arr.length; i++) {
        let [town, product, price] = [arr[i][0], arr[i][1], Number(arr[i][2])];

        if (!result.hasOwnProperty(product)) {
            result[product] = {};
        }

        if (!result[product].hasOwnProperty(town)) {
            result[product][town] = 0;
        }

        result[product][town] = price;
    }

    Object.keys(result).map(p => Object.keys(p).sort((a, b) => result[p][a] - result[p][b]));

    return Object.keys(result)
        .map(x => `${x} -> ${result[x][Object.keys(result[x])[0]]}` + " (" + Object.keys(result[x])[0] + ")")
        .join('\n');
}

console.log(
    lowestPricesInCities(
        [`Sample Town | Sample Product | 1000`,
            `Sample Town | Orange | 2`,
            `Sample Town | Peach | 1`,
            `Sofia | Orange | 3`,
            `Sofia | Peach | 2`,
            `New York | Sample Product | 1000.1`,
            `New York | Burger | 10`]
    )
);