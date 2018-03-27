function sumByTown(arr) {
    let result = {};

    for (let i = 0; i < arr.length - 1; i += 2) {
        let townName = arr[i];
        let townValue = Number(arr[i + 1]);

        if (!result.hasOwnProperty(townName)) {
            result[townName] = 0;
        }

        result[townName] += townValue;
    }

    return JSON.stringify(result);
}

console.log(
    sumByTown([
        'Sofia',
        '20',
        'Varna',
        '3',
        'Sofia',
        '5',
        'Varna',
        '4'
    ])
);