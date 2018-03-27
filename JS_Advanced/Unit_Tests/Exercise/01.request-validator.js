function validateRequest(obj) {
    const methods = {GET: "GET", POST: "POST", DELETE: "DELETE", CONNECT: "CONNECT"};
    const versions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];

    (function () {
        if (!obj.hasOwnProperty("method") || !methods.hasOwnProperty(obj.method)) {
            throw new Error("Invalid request header: Invalid Method");
        }
    })();

    (function () {
        let reg = /^\*$|^[a-zA-Z0-9.]+$/gm;

        if (!obj.hasOwnProperty("uri") || !reg.test(obj.uri)) {
            throw new Error("Invalid request header: Invalid URI");
        }
    })();

    (function () {
        if (!obj.hasOwnProperty("version") || !versions.includes(obj.version)) {
            throw new Error("Invalid request header: Invalid Version");
        }
    })();

    (function () {
        let regex = /^[^<>\\&'"]*?$/;

        if (!obj.hasOwnProperty('message') || !regex.test(obj.message)) {
            throw new Error("Invalid request header: Invalid Message");
        }
    })();

    return obj;
}

module.exports = validateRequest;
