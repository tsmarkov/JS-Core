let expect = require('chai').expect;
const rgbToHexColor = require('../06.rgb-to-hex.js');

describe('Rgb to hex color tests', function () {
    it('should return "#FF9B37" for (255, 155, 55)', function () {
        expect(rgbToHexColor(255, 155, 55)).to.be.equal("#FF9B37")
    });
    it('should return "#000" for (0, 0, 0)', function () {
        expect(rgbToHexColor(0, 0, 0)).to.be.equal("#000000")
    });
    it('should return "#FFFFFF" for (255, 255, 255)', function () {
        expect(rgbToHexColor(255, 255, 255)).to.be.equal("#FFFFFF")
    });
    it('should return undefined for (100, 100, 256)', function () {
        expect(rgbToHexColor(100, 100, 256)).to.be.undefined;
    });
    it('should return undefined for (100, 100, -1)', function () {
        expect(rgbToHexColor(100, 100, -1)).to.be.undefined;
    });
    it('should return undefined for ("FF", 0, 100)', function () {
        expect(rgbToHexColor("FF", 0, 100)).to.be.undefined;
    });
    it('should return undefined for ({}, true, [])', function () {
        expect(rgbToHexColor({}, true, [])).to.be.undefined;
    });
    it('should return undefined for ("50", "100", "200")', function () {
        expect(rgbToHexColor("50", "100", "200")).to.be.undefined;
    });
});