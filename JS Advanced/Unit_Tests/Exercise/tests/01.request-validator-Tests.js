const expect = require('chai').expect;
const validateRequest = require('../01.request-validator');

describe("Request validator tests", function () {
    it('should throw Error for missing message', function () {
        let obj = {method: 'GET', uri: 'svn.public.catalog', version: 'HTTP/1.1'};
        expect(() => validateRequest(obj)).to.throw(Error)
    });
    it('should throw Error for missing method', function () {
        let obj = {uri: 'svn.public.catalog', version: 'HTTP/1.1', message: "Message"};
        expect(() => validateRequest(obj)).to.throw(Error).which.has.property("message", "Invalid request header: Invalid Method")
    });
    //TODO: Complete tests...
});