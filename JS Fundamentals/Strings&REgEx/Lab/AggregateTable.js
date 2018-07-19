function aggregateTable(arr) {
    let citiesAndNumbers = [];
    for (let i = 0; i < arr.length; i++) {
        let matches = arr[i].split(/\s*\|\s*/);
        for (let match of matches) {
            citiesAndNumbers.push(match);
        }
    }

    citiesAndNumbers = citiesAndNumbers.filter(e => e !== '');

    let cities = citiesAndNumbers.filter((e, i) => i % 2 === 0).join(', ');
    let sum = citiesAndNumbers.filter((e, i) => i % 2 !== 0).map(e => Number(e)).reduce((a, b) => a + b);

    console.log(cities);
    console.log(sum);
}