function manager() {
    let recepies = {
        apple: ['protein', 0, 'carbohydrate', 1, 'fat', 0, 'flavour', 2],
        coke: ['protein', 0, 'carbohydrate', 10, 'fat', 0, 'flavour', 20],
        burger: ['protein', 0, 'carbohydrate', 5, 'fat', 7, 'flavour', 3],
        omelet: ['protein', 5, 'carbohydrate', 0, 'fat', 1, 'flavour', 1],
        cheverme: ['protein', 10, 'carbohydrate', 10, 'fat', 10, 'flavour', 10]
    };

    let merinjei = (function () {
        let quantities = {
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            flavour: 0
        };

        return {
            restock: (secondArg, quantity) => {
                quantities[secondArg] += Number(quantity);
                console.log("Success");
            },
            prepare: (secondArg, quantity) => {
                quantity = Number(quantity);
                if (imali()) {
                    for (let i = 0; i < 8; i += 2) {
                        let sustavka = recepies[secondArg][i];
                        let kolichestvo = recepies[secondArg][i + 1];

                        quantities[sustavka] -= kolichestvo * quantity;
                    }

                    console.log("Success");
                }

                function imali() {
                    for (let i = 0; i < 8; i += 2) {
                        let sustavka = recepies[secondArg][i];
                        let kolichestvo = recepies[secondArg][i + 1];

                        if (quantities[sustavka] < kolichestvo * quantity) {
                            console.log(`Error: not enough ${sustavka} in stock`);
                            return false;
                        }
                    }

                    return true;
                }
            },
            report: () => {
                console.log(
                    `protein=${quantities.protein} carbohydrate=${quantities.carbohydrate} fat=${quantities.fat} flavour=${quantities.flavour}`);
            }
        };
    })();

    for (let commandLine of bozi4ki) {
        let [command, secondArg, quantity] = commandLine.split(" ");

        merinjei[command](secondArg, quantity);
    }
}

manager([`prepare cheverme 1`,
    `restock protein 10`,
    `prepare cheverme 1`,
    `restock carbohydrate 10`,
    `prepare cheverme 1`,
    `restock fat 10`,
    `prepare cheverme 1`,
    `restock flavour 10`,
    `prepare cheverme 1`,
    `report`]);
