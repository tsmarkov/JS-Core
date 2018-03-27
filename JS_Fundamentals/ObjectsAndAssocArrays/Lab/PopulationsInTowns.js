function populationInTowns(arr = []) {
    arr = arr.map(s => s.split(' <-> '));
    let townAndPopulation = {};

    for (let i = 0; i < arr.length; i++) {
        let townName = arr[i][0];
        let townPopulation = Number(arr[i][1]);

        if (!townAndPopulation.hasOwnProperty(townName)) {
            townAndPopulation[townName] = 0;
        }

        townAndPopulation[townName] += townPopulation;
    }

    return Object.keys(townAndPopulation)
        .map((e) => `${e} : ${townAndPopulation[e]}`)
        .join('\n');
}