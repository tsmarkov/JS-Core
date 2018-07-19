(function () {
    let id = 0;

    return class Extensible {
        constructor() {
            this.id = id++;
        }

        extend(template) {
            for (let key in template) {
                if (template.hasOwnProperty(key)) {
                    if (typeof template[key] === "function") {
                        Extensible.prototype[key] = template[key];
                    } else {
                        this[key] = template[key];
                    }
                }
            }
        }
    }
})();