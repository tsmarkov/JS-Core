let expect = require('chai').expect;
const sum = require('../04.sum-of-numbers.js');

describe('Sum', function () {
    it('should return 3 for [1, 2]', function () {
        expect(sum([1, 2])).to.be.equal(3);
    });
    it('should return 0 for []', function () {
        expect(sum([])).to.be.equal(0);
    });
    it('should return 2.35 for [1.1, 1.13, 0.12]', function () {
        expect(sum([1.1, 1.13, 0.12])).to.be.equal(2.35);
    });
    it('should return -1 for [3, -4]', function () {
        expect(sum([3, -4])).to.be.equal(-1);
    });
    it('should return NaN for ["String", ["String"]]', function () {
        expect(sum(["String", "String"])).to.be.NaN;
    });
});