const expect = require('chai').expect;
const Console = require('../05.C#-Console.js');

describe('C# Console Tests', function () {
    it('should return the string for ("Test")', function () {
        expect(Console.writeLine("Test")).to.be.equal("Test");
    });
    it('should return undefined for (1)', function () {
        expect(Console.writeLine(1)).to.be.equal(undefined);
    });
    it('should return undefined for (1, 2, 3)', function () {
        expect(() => Console.writeLine(1, 2, 3)).to.throw(TypeError);
    });
    it('should throw TypeError for ()', function () {
        expect(() => Console.writeLine()).to.throw(TypeError);
    });

    it('should return JSON object for ("{a:1}")', function () {
        expect(Console.writeLine({a: 1})).to.be.equal(JSON.stringify({a: 1}));
    });
    it('should return undefined for (12)', function () {
        expect(Console.writeLine(12)).to.be.equal(undefined);
    });

    it('should throw TypeError for ({}, "a")', function () {
        expect(() => Console.writeLine({}, 'a')).to.throw(TypeError);
    });
    it('should throw RangeError for ("{0} {0}", \'a\', "b")', function () {
        expect(() => Console.writeLine("{0} {0}", 'a', "b"))
            .to.throw(RangeError);
    });
    it('should throw RangeError for ("{0} {1} {2}", "a", "b")', function () {
        expect(() => Console.writeLine("{0} {1} {2}", 'a', "b"))
            .to.throw(RangeError);
    });
    it('should throw RangeError for ("{0} {5} {1}", "a", "b", "c")', function () {
        expect(() => Console.writeLine("{0} {5} {1}", "a", "b", "c"))
            .to.throw(RangeError)
    });
    it('should return "a b c" for ("{0} {1} {2}", "a", "b", "c")', function () {
        expect(Console.writeLine("{0} {1} {2}", "a", "b", "c"))
            .to.be.equal("a b c")
    });
    it('should throw TypeError for ("{0} {1}", "a", "b", "c")', function () {
        expect(() => Console.writeLine("{0} {1}", "a", "b", "c"))
            .to.throw(RangeError);
    });
});
