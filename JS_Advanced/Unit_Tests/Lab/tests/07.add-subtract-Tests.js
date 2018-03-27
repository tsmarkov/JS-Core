let expect = require('chai').expect;
const createCalculator = require('../07.add-subtract.js');

describe("Add-subtract tests", function () {
    let calculator;
    beforeEach(function () {
        calculator = createCalculator();
    });

    it("should return 5", function () {
        calculator.add(3);
        calculator.add(2);
        expect(calculator.get()).to.be.equal(5);
    });

    it("should return -1", function () {
        calculator.add(0);
        calculator.add(-1);
        expect(calculator.get()).to.be.equal(-1);
    });

    it("should return -100", function () {
        calculator.add(-99);
        calculator.add(-1);
        expect(calculator.get()).to.be.equal(-100);
    });
    it("should return -100", function () {
        calculator.add('-99');
        calculator.add(-1);
        expect(calculator.get()).to.be.equal(-100);
    });
    it("should return 0", function () {
        calculator.add(0);
        calculator.add(0);
        expect(calculator.get()).to.be.equal(0);
    });

    it("should return 1.3", function () {
        calculator.add(0.8);
        calculator.add(0.5);
        expect(calculator.get()).to.be.equal(1.3);
    });
    it("should return NaN", function () {
        calculator.add([-99,6]);
        calculator.add(-1);
        expect(calculator.get()).to.be.NaN;
    });


    it("should return -5", function () {
        calculator.subtract(3);
        calculator.subtract(2);
        expect(calculator.get()).to.be.equal(-5);
    });

    it("should return -4", function () {
        calculator.subtract(5);
        calculator.subtract(-1);
        expect(calculator.get()).to.be.equal(-4);
    });

    it("should return 100", function () {
        calculator.subtract(-99);
        calculator.subtract(-1);
        expect(calculator.get()).to.be.equal(100);
    });
    it("should return 100", function () {
        calculator.subtract('-99');
        calculator.subtract(-1);
        expect(calculator.get()).to.be.equal(100);
    });
    it("should return 0", function () {
        calculator.subtract(0);
        calculator.subtract(0);
        expect(calculator.get()).to.be.equal(0);
    });

    it("should return -10.5", function () {
        calculator.subtract(12);
        calculator.subtract(-1.5);
        expect(calculator.get()).to.be.equal(-10.5);
    });
    it("should return NaN", function () {
        calculator.subtract([-99,6]);
        calculator.subtract(-1);
        expect(calculator.get()).to.be.NaN;
    });
});