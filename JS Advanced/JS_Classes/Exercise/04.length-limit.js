class Stringer {
    constructor(string, length) {
        this.innerString = string;
        this.innerLength = length;
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        if (this.innerLength - length > 0) {
            this.innerLength -= length;
        } else {
            this.innerLength = 0;
        }
    }

    toString() {
        let output = this.innerString.substr(0, this.innerLength);

        if (output.length < this.innerString.length) {
            output += '...';
        }

        return output;
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); //Test

test.decrease(3);
console.log(test.toString()); //Te...

test.decrease(5);
console.log(test.toString()); //...

test.increase(4);
console.log(test.toString()); //Test