let stringExtensions = (function () {
    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }

        return this.toString();
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }

        return this.toString();
    };

    String.prototype.isEmpty = function () {
        return this.length <= 0;
    };

    String.prototype.truncate = function (n) {
        let newStr = this.toString();

        if (newStr.length <= n) {
            return newStr;
        } else if (newStr.length > n) {
            newStr = newStr.substr(0, n);

            let lastSpaceIndex = newStr.lastIndexOf(' ');
            if (lastSpaceIndex !== -1) {
                newStr = newStr.substring(0, lastSpaceIndex);

                if (newStr.length + 3 > n) {
                    lastSpaceIndex = newStr.lastIndexOf(' ');
                    newStr = newStr.substring(0, lastSpaceIndex);
                }
            } else {
                newStr = newStr.substring(0, newStr.length - 3);
            }
        }

        let ellipsis = ".".repeat(n < 4 ? n : 3);
        return newStr.ensureEnd(ellipsis);
    };

    String.format = function (string, ...args) {
        let newStr = string;

        for (let i = 0; i < args.length; i++) {
            let placeholder = "{" + i + "}";

            newStr = newStr.replace(placeholder, args[i]);
        }

        return newStr;
    };
})()

let str = 'my string';
console.log(str);
str = str.ensureStart('my');
console.log(str);
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(str);
str = String.format('jumps {0} {1}', 'dog');
console.log(str);

let testString = 'the quick brown fox jumps over the lazy dog';
console.log(testString.truncate(10));
console.log(testString.truncate(6));
console.log(testString.truncate(43));