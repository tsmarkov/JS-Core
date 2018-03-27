const expect = require('chai').expect;
const makeList = require('../list-add-left-right-clear.js');

describe("List add left-right and clear Tests", function () {
    let myList = {};

    beforeEach(function () {
        myList = makeList();
    });

    it("should return empty string", function () {
        expect(myList.toString()).to.be.equal("", "not return empty string");
    });

    it('rightAdd should return "0, 1, two"', function () {
        myList.addRight(0);
        myList.addRight(1);
        myList.addRight("two");

        expect(myList.toString()).to.be.equal("0, 1, two", "not adding right correctly");
    });

    it('addLeft should return "2, 1, zero"', function () {
        myList.addLeft("zero");
        myList.addLeft(1);
        myList.addLeft(2);

        expect(myList.toString()).to.be.equal("2, 1, zero", "not adding left correctly");
    });

    it('addLeft and addRight should return zero, one, 2', function () {
        myList.addRight("one");
        myList.addRight(2);
        myList.addLeft("zero");

        expect(myList.toString()).to.be.equal("zero, one, 2", "not adding combine left and right correctly");
    });

    it('should clear empty data', function () {
        myList.clear();
        expect(myList.toString()).to.be.equal("");
    });

    it('should clear data', function () {
        myList.addRight("one");
        myList.clear();
        expect(myList.toString()).to.be.equal("");
    });
});