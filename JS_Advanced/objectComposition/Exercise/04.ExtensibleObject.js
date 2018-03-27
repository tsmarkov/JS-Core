function getExtensibleObject() {
    let obj = {
        extend: function (template) {
            for (let key in template) {
                if (template.hasOwnProperty(key)) {
                    if (typeof template[key] === "function") {
                        Object.getPrototypeOf(obj)[key] = template[key];
                    } else {
                        obj[key] = template[key];
                    }
                }
            }
        }
    };

    return obj;
}

let template = {
    extensionMethod: function () {
    },
    extensionProperty: 'someString'
};

let myObj = getExtensibleObject();
myObj.extend(template);

console.log(myObj);
console.log(Object.getPrototypeOf(myObj));