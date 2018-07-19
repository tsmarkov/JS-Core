function heroicInventory(arr) {
    let resultArray = [];

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(' / ');

        let name = arr[i][0];
        let level = Number(arr[i][1]);
        let items = arr[i][2];

        if (items !== undefined) {
            items = arr[i][2].split(', ');
        }

        let obj = {name: name, level: level, items: items};
        resultArray.push(obj);
    }

    return JSON.stringify(resultArray);
}

console.log(
    heroicInventory(
        [` / / `]
    ));