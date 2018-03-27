const expect = require("chai").expect;
const isOddOrEven = require("../02.even-or-odd.js");

describe("Even or odd tests for valid inputs", function () {
    it('should return even for "" (Empty String)', function () {
        expect(isOddOrEven("")).to.be.equal("even");
    });
    it('should return even for "  " (Two spaces)', function () {
        expect(isOddOrEven("  ")).to.be.equal("even");
    });
    it('should return even for "abcd"', function () {
        expect(isOddOrEven("abcd")).to.be.equal("even");
    });
    it('should return odd for "abc"', function () {
        expect(isOddOrEven("abc")).to.be.equal("odd");
    });
});

describe("Even or odd tests for invalid inputs", function () {
    it('should return undefined for {}', function () {
        expect(isOddOrEven({})).to.be.undefined;
    });
});