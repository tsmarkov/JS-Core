class Textbox {
    constructor(selector, invalidSymbolsPattern) {
        this._elements = $(selector);
        this._value = this._elements[0].value;
        this._invalidSymbols = invalidSymbolsPattern;
        this.onInput();
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;

        for (let element of this.elements) {
            element.value = value;
        }
    }


    get elements() {
        return this._elements;
    }

    isValid() {
        return !this._invalidSymbols.test(this._value);
    }

    onInput() {
        this.elements.on('input', (event) => {
            let text = event.target.value;
            this.value = text;
        })
    }
}

let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input', function () {
    console.log(textbox.value);
});