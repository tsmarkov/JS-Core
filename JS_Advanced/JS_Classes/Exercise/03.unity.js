class Rat {
    constructor(name) {
        this.name = name;
        this.rats = [];
    }

    getRats() {
        return this.rats;
    }

    unite(rat) {
        if (rat instanceof Rat) {
            this.rats.push(rat);
        }
    }

    toString() {
        let output = this.name + '\n';

        for (let rat of this.rats) {
            output += `##${rat.name}\n`;
        }

        return output;
    }
}

let test = new Rat("Pesho");
console.log(test.toString()); //Pesho

console.log(test.getRats()); //[]

test.unite(new Rat("Gosho"));
test.unite(new Rat("Sasho"));
console.log(test.getRats());
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString());
// Pesho
// ##Gosho
// ##Sasho