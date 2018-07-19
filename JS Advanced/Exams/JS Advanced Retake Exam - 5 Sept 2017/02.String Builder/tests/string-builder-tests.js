const expect = require('chai').expect;
const StringBuilder = require('../string-builder.js');

describe('StringBuilder tests', function () {
    describe("Initializations", function () {
        it('should be "" for ()', function () {
            let sb = new StringBuilder();
            expect(sb.toString()).to.be.equal("");
        });
        it('should be "test" for ("test") ', function () {
            let sb = new StringBuilder("test");
            expect(sb.toString()).to.be.equal("test");
        });
        it('should throw TypeError', function () {
            let error = () => new StringBuilder(1);
            expect(() => error()).to.throw(TypeError, 'Argument must be string');
        });
    });

    describe("has properties", function () {
        let sb;
        beforeEach(function () {
            sb = new StringBuilder();
        });
        it('should has own properties', function () {
            expect(sb.__proto__.hasOwnProperty("prepend")).to.be.true;
            expect(sb.__proto__.hasOwnProperty("append")).to.be.true;
            expect(sb.__proto__.hasOwnProperty("remove")).to.be.true;
            expect(sb.__proto__.hasOwnProperty("insertAt")).to.be.true;
            expect(sb.__proto__.hasOwnProperty("toString")).to.be.true;
            expect(sb.hasOwnProperty("_stringArray")).to.be.true;
        });
    });

    describe("append()", function () {
        let sb;
        beforeEach(function () {
            sb = new StringBuilder();
        });
        it('should be "test" for ("test")', function () {
            sb.append("test");
            expect(sb.toString()).to.be.equal("test");
        });
        it('should be "test1test2" for appends of ("test1") and ("test2")', function () {
            sb.append("test1");
            sb.append("test2");
            expect(sb.toString()).to.be.equal("test1test2");
        });
        it('should trow TypeError for ()', function () {
            expect(() => sb.append()).to.throw(TypeError, 'Argument must be string');
        });
        it('should trow TypeError for (1)', function () {
            expect(() => sb.append(1)).to.throw(TypeError, 'Argument must be string');
        });
    });

    describe("prepend()", function () {
        let sb;
        beforeEach(function () {
            sb = new StringBuilder();
        });
        it('should be "test" for ("test")', function () {
            sb.prepend("test");
            expect(sb.toString()).to.be.equal("test");
        });
        it('should be "test2test1" for prepends of ("test1") and ("test2")', function () {
            sb.prepend("test1");
            sb.prepend("test2");
            expect(sb.toString()).to.be.equal("test2test1");
        });
        it('should trow TypeError for ()', function () {
            expect(() => sb.prepend()).to.throw(TypeError, 'Argument must be string');
        });
        it('should trow TypeError for (1)', function () {
            expect(() => sb.prepend(1)).to.throw(TypeError, 'Argument must be string');
        });
    });

    describe("insertAt()", function () {
        let sb;
        beforeEach(function () {
            sb = new StringBuilder();
        });
        it('should be "test" for ("es", 1) insertion on "tt"', function () {
            sb.append("tt");
            sb.insertAt("es", 1);
            expect(sb.toString()).to.be.equal("test");
        });
        it('should be undefined for ("")', function () {
            expect(sb.insertAt("")).to.be.undefined;
        });
        it('should trow TypeError for ()', function () {
            expect(() => sb.insertAt()).to.throw(TypeError, 'Argument must be string');
        });
        it('should trow TypeError for (1, 1)', function () {
            expect(() => sb.insertAt(1, 1)).to.throw(TypeError, 'Argument must be string');
        });
    });

    describe("remove()", function () {
        it('should be "tt" for (1, 2) with "test"', function () {
            let sb = new StringBuilder("test");
            sb.remove(1, 2);
            expect(sb.toString()).to.be.equal("tt");
        });
        it('should be "" for  (0, 0) with ""', function () {
            let sb = new StringBuilder();
            sb.remove(0, 0);
            expect(sb.toString()).to.be.equal("");
        });
    });

    describe("Array and toString()", function () {
        let sb;
        beforeEach(function () {
            sb = new StringBuilder("test");
        });
        it('should holds data in array', function () {
            sb = new StringBuilder();
            let isArray = sb._stringArray instanceof Array;
            expect(isArray).to.be.true;
            expect(sb._stringArray.length).to.be.equal(0);
        });
        it('should holds data in array after methods', function () {
            sb.append("t");
            sb.prepend("t");
            sb.insertAt("e", 2);
            sb.remove(4, 1);

            let isArray = sb._stringArray instanceof Array;
            expect(sb._stringArray.join('')).to.be.equal(sb.toString());
        });
    });

    describe('constructor with parameter', function () {
        let startingString = 'hello';

        beforeEach(function () {
            builder = new StringBuilder(startingString);
        });

        it('must initialize data to a string array', function () {
            expect(builder._stringArray instanceof Array).to.equal(true, 'Data must be of type array');
            compareArray(builder._stringArray, Array.from(startingString));
        });

        it('appends correctly', function () {
            let str = ', world';
            builder.append(str);
            compareArray(builder._stringArray, Array.from(startingString + str));
        });

        it('prepends correctly', function () {
            let str = 'welcome ';
            builder.prepend(str);
            compareArray(builder._stringArray, Array.from(str + startingString));
        });

        it('inserts correctly', function () {
            let str = 'kek';
            builder.insertAt(str, 3);
            let expected = Array.from(startingString);
            expected.splice(3, 0, ...str);
            compareArray(builder._stringArray, expected);
        });

        it('removes correctly', function () {
            builder.remove(1, 3);
            compareArray(builder._stringArray, Array.from('ho'));
        });
    });

    function compareArray(source, expected) {
        expect(source.length).to.equal(expected.length, "Arrays don't match");
        for (let i = 0; i < source.length; i++) {
            expect(source[i]).to.equal(expected[i], 'Element ' + i + ' mismatch');
        }
    }
});