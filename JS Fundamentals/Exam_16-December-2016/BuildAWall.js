function build_a_wall(arr = []) {
    arr = arr.map(n => Number(n));

    let totalCubicYardsConcrete = 0;
    let concreteTotalPrice = 1900;

    let dailyConcreteDoses = [];

    while (true) {
        let dailyConcreteAmount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < 30) {
                arr[i]++;
                dailyConcreteAmount += 195;
                totalCubicYardsConcrete += 195;
            }
        }

        if (dailyConcreteAmount <= 0) {
            break;
        } else {
            dailyConcreteDoses.push(dailyConcreteAmount);
        }
    }

    return `${dailyConcreteDoses.join(', ')}` +
        `\n` +
        `${concreteTotalPrice * totalCubicYardsConcrete} pesos`;
}