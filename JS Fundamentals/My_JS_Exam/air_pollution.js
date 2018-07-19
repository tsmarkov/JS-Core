function air_pollution(sofiaMap, commands) {
    sofiaMap = sofiaMap.map(x => x.split(' ').map(n => Number(n)));

    for (let command of commands) {
        let commandParams = command.split(' ');
        let [commandName, commandValue] = [commandParams[0], Number(commandParams[1])];

        switch (commandName) {
            case 'breeze':
                breeze(sofiaMap, commandValue);
                break;
            case 'gale':
                gale(sofiaMap, commandValue);
                break;
            case 'smog':
                smog(sofiaMap, commandValue);
                break;
        }
    }

    let pollutedAreas = [];

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (sofiaMap[i][j] >= 50) {
                pollutedAreas.push(`[${i}-${j}]`);
            }
        }
    }

    if (pollutedAreas.length === 0) {
        return 'No polluted areas';
    }

    return `Polluted areas: ${pollutedAreas.join(', ')}`;

    function breeze(sofiaMap, index) {
        for (let i = 0; i < 5; i++) {
            let pollution = sofiaMap[index][i] - 15;

            if (pollution < 0) {
                pollution = 0;
            }

            sofiaMap[index][i] = pollution;
        }
    }

    function gale(sofiaMap, index) {
        for (let i = 0; i < 5; i++) {
            let pollution = sofiaMap[i][index] - 20;

            if (pollution < 0) {
                pollution = 0;
            }

            sofiaMap[i][index] = pollution;
        }
    }

    function smog(sofiaMap, value) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                sofiaMap[i][j] += value;
                //let pollution = sofiaMap[i][j] + value;

                //if (pollution > 50) {
                //    pollution = 50;
                //}
//
                //sofiaMap[i][j] = pollution
            }
        }
    }
}

console.log(
    air_pollution(
        [
            "5 7 72 14 4",
            "41 35 37 27 33",
            "23 16 27 42 12",
            "2 20 28 39 14",
            "16 34 31 10 24",
        ],
        ["breeze 1", "gale 2", "smog 25"]
    )
);