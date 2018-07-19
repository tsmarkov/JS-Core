function solve(worker) {
    if (worker['handsShaking'] === true) {
        worker['bloodAlcoholLevel'] += (0.1 * (worker['weight'] * worker['experience']));
        worker['handsShaking'] = false;
    }

    return worker;
}

console.log(
    solve({
    weight: 80,
    experience: 1,
    bloodAlcoholLevel: 0,
    handsShaking: true
}));

console.log(solve({
    weight: 120,
    experience: 20,
    bloodAlcoholLevel: 200,
    handsShaking: true
}));

console.log(solve({
    weight: 95,
    experience: 3,
    bloodAlcoholLevel: 0,
    handsShaking: false
}));
