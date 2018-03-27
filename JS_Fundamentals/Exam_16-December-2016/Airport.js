function airport(input = []) {
    let landedAirplanes = new Set();
    let townsWithArrivalsAndDepartures = {};

    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].split(/\s+/);
        let [planeID, town, passengersCount, action] = [input[i][0], input[i][1], Number(input[i][2]), input[i][3]];

        if (action === "land") {
            if (!landedAirplanes.has(planeID)) {
                landedAirplanes.add(planeID);

                if (!townsWithArrivalsAndDepartures.hasOwnProperty(town)) {
                    townsWithArrivalsAndDepartures[town] = {
                        arrivals: 0,
                        departures: 0,
                        planes: new Set()
                    }
                }

                townsWithArrivalsAndDepartures[town]['arrivals'] += passengersCount;
                townsWithArrivalsAndDepartures[town]['planes'].add(planeID);
            }
        }
        else if (action === "depart") {
            if (landedAirplanes.has(planeID)) {
                landedAirplanes.delete(planeID);

                if (!townsWithArrivalsAndDepartures.hasOwnProperty(town)) {
                    townsWithArrivalsAndDepartures[town] = {
                        arrivals: 0,
                        departures: 0,
                        planes: new Set()
                    }
                }

                townsWithArrivalsAndDepartures[town]['departures'] += passengersCount;
                townsWithArrivalsAndDepartures[town]['planes'].add(planeID);
            }
        }
    }

    let result = [];
    result.push("Planes left:");

    landedAirplanes = Array.from(landedAirplanes).sort((a, b) => a.localeCompare(b));

    if (landedAirplanes.length > 0) {
        result.push(landedAirplanes.map(x => `- ${x}`).join('\n'));
    }
    let sortedCityKeys = Object.keys(townsWithArrivalsAndDepartures).sort((a, b) => {
        let comp = townsWithArrivalsAndDepartures[b]['arrivals'] - townsWithArrivalsAndDepartures[a]['arrivals'];
        return comp === 0 ? a.localeCompare(b) : comp;
    });

    for (let cityKey of sortedCityKeys) {
        result.push(`${cityKey}`);
        result.push(`Arrivals: ${townsWithArrivalsAndDepartures[cityKey]['arrivals']}`);
        result.push(`Departures: ${townsWithArrivalsAndDepartures[cityKey]['departures']}`);
        result.push(`Planes:`);

        let planes = Array.from(townsWithArrivalsAndDepartures[cityKey]['planes'])
            .sort((a, b) => a.localeCompare(b))
            .map(x => `-- ${x}`);

        if (planes.length > 0) {
            result.push(planes.join('\n'));
        }
    }


    return result.join('\n');
}

console.log(
    airport([`Airbus London 100 land`,
        `Airbus Paris 200 depart`,
        `Airbus Madrid 130 depart`,
        `Airbus Lisbon 403 depart`,
        `Airbus Moscow 505 depart`,
        `Airbus Sofia 16 depart`])
);