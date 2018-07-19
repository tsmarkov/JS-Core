function assembleCar(car) {
    const engines = {
        small: {power: 90, volume: 1800},
        normal: {power: 120, volume: 2400},
        monster: {power: 200, volume: 3500}
    };

    const carTypes = {
        hatchback: {type: 'hatchback', color: undefined},
        coupe: {type: 'coupe', color: undefined}
    };

    let engine = engines[Object.keys(engines).filter(e => engines[e].power >= car.power)[0]];

    let carriage = carTypes[car.carriage];
    carriage.color = car.color;

    let wheels = new Array(4).fill(car.wheelsize % 2 === 0 ? car.wheelsize - 1 : car.wheelsize);

    let assembledCar = {
        model: car.model,
        engine: engine,
        carriage: carriage,
        wheels: wheels
    };

    return assembledCar;
}

console.log(assembleCar({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
}));

console.log(assembleCar({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}));