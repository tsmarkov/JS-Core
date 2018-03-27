class PaymentProcessor {
    constructor(options) {
        this.payments = {};
        this.options = this.setOptions(options);
    }

    registerPayment(id, name, type, value) {
        if (id === "" || name === "" || !this.options.types.includes(type) ||
            !this._isNumber(value) || this.payments.hasOwnProperty(id)) {
            throw Error();
        }

        this.payments[id] = {id: id, name: name, type: type, value: value};
    }

    deletePayment(id) {
        if (!this.payments.hasOwnProperty(id)) {
            throw Error();
        }

        delete this.payments[id];
    }

    get(id) {
        if (!this.payments.hasOwnProperty(id)) {
            throw Error();
        }

        let details = `Details about payment ID: ${id}\n`;
        details += `- Name: ${this.payments[id].name}\n`;
        details += `- Type: ${this.payments[id].type}\n`;
        details += `- Value: ${this.payments[id].value.toFixed(this.options.precision)}`;

        return details;
    }

    setOptions(options) {
        let newOptions = {
            types: ["service", "product", "other"],
            precision: 2
        };

        if (options !== undefined) {
            if (options.hasOwnProperty('types')) {
                newOptions.types = options.types;
            }

            if (options.hasOwnProperty('precision')) {
                newOptions.precision = options.precision;
            }
        }

        this.options = newOptions;
        return newOptions;
    }

    toString() {
        let output = `Summary:\n`;
        output += `- Payments: ${this._objectLength(this.payments)}\n`;
        output += `- Balance: ${this._getBalance().toFixed(this.options.precision)}`;

        return output;
    }

    _getBalance() {
        let balance = 0;

        for (let idKey in this.payments) {
            balance += this.payments[idKey].value;
        }

        return balance;
    }

    _isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n) && typeof n !== "string";
    }

    _objectLength(obj) {
        let size = 0;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                size++;
            }
        }
        return size;
    };
}

// Initialize processor with default options
const generalPayments = new PaymentProcessor();
generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
console.log(generalPayments.toString());

// Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);

generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);

/*// Should throw an error (ID not found)*/
// generalPayments.deletePayment('E027');
/*// Should throw an error (ID not found)*/
generalPayments.get('E027');

generalPayments.deletePayment('E028');
console.log(generalPayments.toString());

// Initialize processor with custom types
const servicePyaments = new PaymentProcessor({types: ['service']});
servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
console.log(servicePyaments.toString());

// Initialize processor with custom precision
const transactionLog = new PaymentProcessor({precision: 5});
transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
console.log(transactionLog.toString());
