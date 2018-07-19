function game_of_epicness(objects, wars) {
    let kingdoms = {};
    let kingdomsAndResults = {};

    for (let obj of objects) {
        obj['wins'] = 0;
        obj['loses'] = 0;

        if (!kingdoms.hasOwnProperty(obj['kingdom'])) {
            kingdoms[obj['kingdom']] = {};
            kingdomsAndResults[obj['kingdom']] = {wins: 0, loses: 0}
        }

        if (!kingdoms[obj['kingdom']].hasOwnProperty(obj['general'])) {
            kingdoms[obj['kingdom']][obj['general']] = obj;
        } else {
            kingdoms[obj['kingdom']][obj['general']]['army'] += obj['army'];
        }
    }

    for (let war of wars) {
        let attackingKingdom = war[0];
        let attackingGeneral = war[1];
        let defendingKingdom = war[2];
        let defendingGeneral = war[3];

        if (attackingKingdom !== defendingKingdom) {
            if (kingdoms[attackingKingdom][attackingGeneral]['army'] > kingdoms[defendingKingdom][defendingGeneral]['army']) {
                kingdoms[attackingKingdom][attackingGeneral]['army'] = Math.floor(kingdoms[attackingKingdom][attackingGeneral]['army'] * 1.1);
                kingdoms[defendingKingdom][defendingGeneral]['army'] = Math.floor(kingdoms[defendingKingdom][defendingGeneral]['army'] * 0.9);

                kingdomsAndResults[attackingKingdom]['wins']++;
                kingdomsAndResults[defendingKingdom]['loses']++;

                kingdoms[attackingKingdom][attackingGeneral]['wins']++;
                kingdoms[defendingKingdom][defendingGeneral]['loses']++;

            } else if (kingdoms[attackingKingdom][attackingGeneral]['army'] < kingdoms[defendingKingdom][defendingGeneral]['army']) {
                kingdoms[attackingKingdom][attackingGeneral]['army'] = Math.floor(kingdoms[attackingKingdom][attackingGeneral]['army'] * 0.9);
                kingdoms[defendingKingdom][defendingGeneral]['army'] = Math.floor(kingdoms[defendingKingdom][defendingGeneral]['army'] * 1.1);

                kingdomsAndResults[attackingKingdom]['loses']++;
                kingdomsAndResults[defendingKingdom]['wins']++;

                kingdoms[attackingKingdom][attackingGeneral]['loses']++;
                kingdoms[defendingKingdom][defendingGeneral]['wins']++;
            }
        }
    }

    let sorted = Object.keys(kingdoms).sort((a, b) => {
        let comp = kingdomsAndResults[b]['wins'] - kingdomsAndResults[a]['wins'];

        if (comp === 0) {
            comp = kingdomsAndResults[a]['loses'] - kingdomsAndResults[b]['loses'];
        }

        if (comp === 0) {
            comp = a.localeCompare(b);
        }

        return comp;
    });

    let result = [];
    result.push(`Winner: ${sorted[0]}`);

    let sortedGens = Object.keys(kingdoms[sorted[0]])
        .sort((a, b) => kingdoms[sorted[0]][b]['army'] - kingdoms[sorted[0]][a]['army']);

    for (let general of sortedGens) {
        result.push(`/\\general: ${general}`);
        result.push(`---army: ${kingdoms[sorted[0]][general]['army']}`);
        result.push(`---wins: ${kingdoms[sorted[0]][general]['wins']}`);
        result.push(`---losses: ${kingdoms[sorted[0]][general]['loses']}`);
    }

    return result.join('\n');
}

console.log(
    game_of_epicness(
        [ { kingdom: "Maiden Way", general: "Merek", army: 5000 },
            { kingdom: "Stonegate", general: "Ulric", army: 4900 },
            { kingdom: "Stonegate", general: "Doran", army: 70000 },
            { kingdom: "YorkenShire", general: "Quinn", army: 0 },
            { kingdom: "YorkenShire", general: "Quinn", army: 2000 },
            { kingdom: "Maiden Way", general: "Berinon", army: 100000 } ],
        [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
            ["Stonegate", "Ulric", "Stonegate", "Doran"],
            ["Stonegate", "Doran", "Maiden Way", "Merek"],
            ["Stonegate", "Ulric", "Maiden Way", "Merek"],
            ["Maiden Way", "Berinon", "Stonegate", "Ulric"] ]
    )
);