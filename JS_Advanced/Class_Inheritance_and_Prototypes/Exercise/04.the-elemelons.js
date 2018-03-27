function classes() {
    class Melon {
        constructor(weight, melonSort) {
            if (new.target === Melon) {
                throw new TypeError("Abstract class cannot be instantiated directly");
            }

            this.weight = weight;
            this.melonSort = melonSort;
            this._elementIndex = weight * melonSort.length;
        }

        get elementIndex() {
            return this._elementIndex;
        }

        toString() {
            let element = this.constructor.name.replace("melon", "");

            return `Element: ${element}` + `\n` +
                `Sort: ${this.melonSort}` + `\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }

    class Watermelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Firemelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Earthmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Airmelon extends Melon {
        constructor(weight, melonSort) {
            super(weight, melonSort);
        }
    }

    class Melolemonmelon extends Watermelon {
        constructor(wight, sortMelon) {
            super(wight, sortMelon);
            this.element = 'Water';
            this.elementsList = ['Fire', 'Earth', 'Air', 'Water'];

        }

        morph() {
            let currentElement = this.elementsList.shift();
            this.element = currentElement;
            this.elementsList.push(currentElement);

            return this;
        }

        toString() {
            return `Element: ${this.element}` + `\n` +
                `Sort: ${this.melonSort}` + `\n` +
                `Element Index: ${this.elementIndex}`;
        }
    }

    return {
        Melon,
        Watermelon,
        Firemelon,
        Earthmelon,
        Airmelon,
        Melolemonmelon
    }
}

let clas = classes();

let test = new clas.Melolemonmelon(150, "Melo");
test.morph();
test.morph();
test.morph();
test.morph();
test.morph();
test.morph();

console.log(test.toString());