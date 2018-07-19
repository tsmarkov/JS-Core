const expect = require('chai').expect;
const PaymentPackage = require('../payment-package');

describe('Payment package tests', function () {
    //Initialisation
    it('should throw Error for ()', function () {
        expect(() => new PaymentPackage()).to.throw(Error);
    });
    it('should throw Error for ("", 0)', function () {
        expect(() => new PaymentPackage("", 0)).to.throw(Error);
    });
    it('should throw Error for ("Non-empty string", "positive number")', function () {
        expect(() => new PaymentPackage("Non-empty string", -1)).to.throw(Error);
    });
    it('should throw Error for ("Non-empty string", -1)', function () {
        expect(() => new PaymentPackage("Non-empty string", -1)).to.throw(Error);
    });
    it('should not throw for ("Non-empty string", 1)', function () {
        expect(() => new PaymentPackage("Non-empty string", 1)).not.to.throw(Error);
    });

    //Check properties
    it('should has name ', function () {
        let pp = new PaymentPackage('Non-empty string', 0);

        expect(pp.__proto__.hasOwnProperty('name')).to.be.equal(true);
        expect(pp.__proto__.hasOwnProperty('value')).to.be.equal(true);
        expect(pp.__proto__.hasOwnProperty('VAT')).to.be.equal(true);
        expect(pp.__proto__.hasOwnProperty('active')).to.be.equal(true);
        expect(pp.__proto__.hasOwnProperty('toString')).to.be.equal(true);
    });

    let pp;
    beforeEach(function () {
        pp = new PaymentPackage("Non-empty string", 10);
    });

    //Test name accessors
    it('name should return "Non-empty string"', function () {
        expect(pp.name).to.be.equal("Non-empty string");
    });
    it('name should return "abc" after set name', function () {
        pp.name = "abc";
        expect(pp.name).to.be.equal("abc");
    });
    it('name should return throw Error for name set with empty string', function () {
        expect(() => pp.name = "").to.throw(Error);
    });
    it('name should throw Error for name set with non string ', function () {
        expect(() => pp.name = 1).to.throw(Error);
    });

    //Test value accessors
    it('value should return 10 ', function () {
        expect(pp.value).to.be.equal(10);
    });
    it('value should return 20 after set value ', function () {
        pp.value = 20;
        expect(pp.value).to.be.equal(20);
    });
    it('value should throw Error for value set with negative number ', function () {
        expect(() => pp.value = -10).to.throw(Error);
    });
    it('value should throw Error for value set with non number ', function () {
        expect(() => pp.value = "-10").to.throw(Error);
    });

    //Test VAT accessors
    it('VAT should return 20 ', function () {
        expect(pp.VAT).to.be.equal(20);
    });
    it('VAT should return 40 after set VAT ', function () {
        pp.VAT = 40;
        expect(pp.VAT).to.be.equal(40);
    });
    it('VAT should throw Error for VAT set with negative number ', function () {
        expect(() => pp.VAT = -10).to.throw(Error);
    });
    it('VAT should throw Error for VAT set with non number ', function () {
        expect(() => pp.VAT = "-10").to.throw(Error);
    });

    //Test active accessors
    it('active should return true ', function () {
        expect(pp.active).to.be.true;
    });
    it('active should return false after set', function () {
        pp.active = false;
        expect(pp.active).to.be.false;
    });
    it('active should throw Error for active set with non boolean ', function () {
        expect(() => pp.active = "true").to.throw(Error);
    });

    //Test toString functionality
    it('should ', function () {
        pp.value = 1500;
        let expectedOutput = `Package: Non-empty string\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800`;
        expect(pp.toString()).to.be.equal(expectedOutput)
    });
    it('should ', function () {
        pp.value = 1500;
        pp.active = false;
        let expectedOutput = `Package: Non-empty string (inactive)\n- Value (excl. VAT): 1500\n- Value (VAT 20%): 1800`;
        expect(pp.toString()).to.be.equal(expectedOutput)
    });
});