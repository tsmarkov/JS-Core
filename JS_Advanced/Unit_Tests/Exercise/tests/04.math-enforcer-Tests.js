const expect = require('chai').expect;
const mathEnforcer = require('../04.math-enforcer.js');

describe("Math enforcer addFive() tests", function () {
    describe("valid input", function () {
        it('should return 12 for (7) ', function () {
            expect(mathEnforcer.addFive(7)).to.be.equal(12);
        });
        it('should return 7.5 for (2.5)', function () {
            expect(mathEnforcer.addFive(2.5)).to.be.equal(7.5);
        });
        it('should return 0 for (-5)', function () {
            expect(mathEnforcer.addFive(-5)).to.be.equal(0);
        });
        it('should return 0 for (-5)', function () {
            expect(mathEnforcer.addFive(-8)).to.be.equal(-3);
        });
    });

    describe("invalid input", function () {
        it('should return undefined for ("1") ', function () {
            expect(mathEnforcer.addFive("1")).to.be.undefined;
        });
        it('should return undefined for ({}) ', function () {
            expect(mathEnforcer.addFive({})).to.be.undefined;
        });
        it('should return undefined for ()', function () {
            expect(mathEnforcer.addFive()).to.be.undefined;
        });
    });
});

describe("Math enforcer subtractTen() tests", function () {
    describe("valid input", function () {
        it('should return 0 for (10) ', function () {
            expect(mathEnforcer.subtractTen(10)).to.be.equal(0);
        });
        it('should return 2.5 for (12.5)', function () {
            expect(mathEnforcer.subtractTen(12.5)).to.be.equal(2.5);
        });
        it('should return 20 for (-10)', function () {
            expect(mathEnforcer.subtractTen(-10)).to.be.equal(-20);
        });
    });

    describe("invalid input", function () {
        it('should return undefined for ("10") ', function () {
            expect(mathEnforcer.subtractTen("10")).to.be.undefined;
        });
        it('should return undefined for ()', function () {
            expect(mathEnforcer.subtractTen()).to.be.undefined;
        });
    });
});

describe("Math enforcer sum() tests", function () {
    describe("valid input", function () {
        it('should return 27 for (12, 15) ', function () {
            expect(mathEnforcer.sum(12, 15)).to.be.equal(27);
        });
        it('should return 20.5 for (12.4, 8.1)', function () {
            expect(mathEnforcer.sum(12.4, 8.1)).to.be.equal(20.5);
        });
        it('should return -11.1 for (-10, -1.1)', function () {
            expect(mathEnforcer.sum(-10, -1.1)).to.be.equal(-11.1);
        });
    });

    describe("invalid input", function () {
        it('should return undefined for ("10", 1) ', function () {
            expect(mathEnforcer.sum("10", 1)).to.be.undefined;
        });
        it('should return undefined for ("10", "1") ', function () {
            expect(mathEnforcer.sum("10", "1")).to.be.undefined;
        });
        it('should return undefined for (1) ', function () {
            expect(mathEnforcer.sum(1)).to.be.undefined;
        });
        it('should return undefined for ({}, {})', function () {
            expect(mathEnforcer.sum({}, {})).to.be.undefined;
        });
        it('should return undefined for ()', function () {
            expect(mathEnforcer.sum()).to.be.undefined;
        });
    });
});