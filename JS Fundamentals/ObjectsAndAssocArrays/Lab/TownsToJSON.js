function townsToJSON(arr) {
    let keys = arr[0].split(/\s*\|\s*/).filter(x => x !== '');

    let result = [];
    for (let i = 1; i < arr.length; i++) {
        let [town, lat, long] = arr[i].split(/\s*\|\s*/).filter(x => x !== '');

        let obj = {};
        obj[keys[0]] = town;
        obj[keys[1]] = Number(lat);
        obj[keys[2]] = Number(long);

        result.push(JSON.stringify(obj));
    }

    return "[" + result.join(',') + "]";
}

console.log(
    townsToJSON(
        ['| Town | Latitude | Longitude |',
            '| Sofia | 42.696552 | 23.32601 |',
            '| Beijing | 39.913818 | 116.363625 |']
    ));