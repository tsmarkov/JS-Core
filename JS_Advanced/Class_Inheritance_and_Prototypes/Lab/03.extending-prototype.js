class Human {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return `${this.constructor.name} with name ${this.name}.`
    }
}

function extendPrototype(extensibleClass) {
    extensibleClass.prototype.species = "Human";
    extensibleClass.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`
    };
}

let human = new Human("Paun");
extendPrototype(Human);

console.log(human.toSpeciesString());