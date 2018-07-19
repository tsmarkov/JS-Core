const expect = require('chai').expect;
const Sumator = require('../sumator');

describe("Sumator class tests", function () {
    let sumator;
    beforeEach(function () {
        sumator = new Sumator();
    });

    it('should be empty array', function () {
        let isArray = false;
        if (sumator.data instanceof Array) {
            isArray = true;
        }

        expect(isArray).to.be.equal(true, "data prop is not an array");
        expect(sumator.data.length).to.be.equal(0, 'data array is not empty"');
    });
    it('should has properties', function () {
        expect(sumator.hasOwnProperty('data')).to.be.true;
        expect(Object.getPrototypeOf(sumator).hasOwnProperty('add')).to.be.true;
        expect(Object.getPrototypeOf(sumator).hasOwnProperty('sumNums')).to.be.true;
        expect(Object.getPrototypeOf(sumator).hasOwnProperty('removeByFilter')).to.be.true;
        expect(Object.getPrototypeOf(sumator).hasOwnProperty('toString')).to.be.true;
    });

    //Add method tests
    it('should add any types in the class data', function () {
        sumator.add(1);
        sumator.add('2');
        sumator.add(true);
        sumator.add([4]);
        sumator.add({});
        sumator.add();

        expect(sumator.data.join(", ")).to.be.equal("1, 2, true, 4, [object Object], ");
    });

    //SumNums method tests
    it('should return zero for []', function () {
        let sumNums = sumator.sumNums();
        expect(sumNums).to.be.equal(0, "sumNums for empty array is not 0");
    });
    it('should return zero for ["1", "two"]', function () {
        sumator.data = ["1", "two"];
        let sumNums = sumator.sumNums();
        expect(sumNums).to.be.equal(0, "sumNums for array of strings is not 0");
    });
    it('should return 10 for [1, "2", 2, 3, true, 4]', function () {
        sumator.data = [1, "2", 2, 3, true, 4];
        let sumNums = sumator.sumNums();
        expect(sumNums).to.be.equal(10, "data sum is not 10");
    });
    it('should return 9.99 for [1, 8.99]', function () {
        sumator.data = [1, 8.99];
        let sumNums = sumator.sumNums();
        expect(sumNums).to.be.equal(9.99, "data sum is not 9.99");
    });
    it('should return -1.8 for [-1, -2, 1.2]', function () {
        sumator.data = [-1, -2, 1.2];
        let sumNums = sumator.sumNums();
        expect(sumNums).to.be.equal(-1.8, "data sum is not -1.8");
    });
    it('should return 0 for [0 , 0]', function () {
        sumator.data = [0, 0];
        let sumNums = sumator.sumNums();
        expect(sumNums).to.be.equal(0, "data sum is not 0");
    });

    //RemoveByFilter method tests
    it('should remove even numbers', function () {
        sumator.data = [1, 2, 3, 4, 5, 6, 7, 8];
        sumator.removeByFilter(e => e % 2 === 0);
        expect(sumator.data.join(", ")).to.be.equal("1, 3, 5, 7");
    });
    it('should remove all strings', function () {
        sumator.data = [1, "2", 3, "4", 5, "6", 7, "8", 9];
        sumator.removeByFilter(e => typeof e === "string");
        expect(sumator.data.join(", ")).to.be.equal("1, 3, 5, 7, 9");
    });

    //toString tests
    it('should return (empty)', function () {
        expect(sumator.toString()).to.be.equal("(empty)");
    });
    it('should return "1, 2, 3, true, "', function () {
        sumator.data = [1, 2, 3, true, [4], {}];

        expect(sumator.toString()).to.be.equal(sumator.data.join(", "));
        expect(sumator.toString()).to.be.equal("1, 2, 3, true, 4, [object Object]");
    });
});