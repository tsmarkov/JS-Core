const expect = require('chai').expect;
const lookupChar = require("../03.char-lookup");

describe("Char lookup valid input", function () {
    it('should return `S` for ("String", 0)', function () {
        expect(lookupChar("String", 0)).to.be.equal('S');
    });
    it('should return `g` for ("String", 5)', function () {
        expect(lookupChar("String", 5)).to.be.equal('g');
    });
    it('should return `i` for ("String", 3)', function () {
        expect(lookupChar("String", 3)).to.be.equal('i');
    });
    it('should return ` ` for (" ", 0)', function () {
        expect(lookupChar(" ", 0)).to.be.equal(' ');
    });
});

describe("Char lookup incorrect input params types", function () {
    it('should return undefined for (10, 10)', function () {
        expect(lookupChar(10, 10)).to.be.undefined;
    });
    it('should return undefined for ("String", "10")', function () {
        expect(lookupChar(10, "10")).to.be.undefined;
    });
    it('should return undefined for ("String", 4.5)', function () {
        expect(lookupChar("String", 4.5)).to.be.undefined;
    });
    it('should return undefined for ("String")', function () {
        expect(lookupChar("String")).to.be.undefined;
    });
    it('should return undefined for ({}, {})', function () {
        expect(lookupChar({}, {})).to.be.undefined;
    });
    it('should return undefined for ()', function () {
        expect(lookupChar()).to.be.undefined;
    });
});

describe("Char lookup incorrect params values", function () {
    it('should return "Incorrect index" for ("string", 10)', function () {
        expect(lookupChar("string", 14)).to.be.equal("Incorrect index");
    });
    it('should return Incorrect index for ("str", 3)', function () {
        expect(lookupChar("str", 3)).to.be.equal("Incorrect index");
    });
    it('should return "Incorrect index" for ("", 0)', function () {
        expect(lookupChar("", 0)).to.be.equal("Incorrect index");
    });
    it('should return "Incorrect index" for ("string", -10)', function () {
        expect(lookupChar("string", -10)).to.be.equal("Incorrect index");
    });
});
