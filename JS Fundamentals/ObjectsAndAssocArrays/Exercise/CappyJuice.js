function juice(arr) {
    let fruitsAndCounts = {};
    let fruitsAndBottles = {};

    for (let obj of arr) {
        let juiceParams = obj.split(' => ');
        let name = juiceParams[0];
        let count = Number(juiceParams[1]);

        if (!fruitsAndCounts.hasOwnProperty(name)) {
            fruitsAndCounts[name] = 0;
        }

        fruitsAndCounts[name] += count;

        if (fruitsAndCounts[name] >= 1000) {
            if (!fruitsAndBottles.hasOwnProperty(name)) {

                fruitsAndBottles[name] = 0;
            }
            fruitsAndBottles[name] += parseInt(fruitsAndCounts[name] / 1000);

            fruitsAndCounts[name] %= 1000;
        }

    }

    return Object.keys(fruitsAndBottles).map(s => `${s} => ${fruitsAndBottles[s]}`).join('\n');
}

console.log(
    juice(
        [`Kiwi => 234`,
            `Pear => 2345`,
            `Watermelon => 3456`,
            `Kiwi => 4567`,
            `Pear => 5678`,
            `Watermelon => 6789`]
    )
);