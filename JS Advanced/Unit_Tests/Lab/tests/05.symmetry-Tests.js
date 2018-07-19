let expect = require('chai').expect;
const isSymmetric = require('../05.symmetry.js');

describe('Symmetry tests', function () {
    it('should return true for [1, 2, 1]', function () {
        expect(isSymmetric([1, 2, 1])).to.be.true;
    });
    it('should return false for ["1", 2, 1]', function () {
        expect(isSymmetric(["1", 2, 1])).to.be.false;
    });
    it('should return false for [1, 2,-1]', function () {
        expect(isSymmetric([1, 2, -1])).to.be.false;
    });
    it('should return false for {}', function () {
        expect(isSymmetric({})).to.be.false;
    });
    it('should return true for []', function () {
        expect(isSymmetric([])).to.be.true;
    });
    it('should return true for [0]', function () {
        expect(isSymmetric([0])).to.be.true;
    });
});