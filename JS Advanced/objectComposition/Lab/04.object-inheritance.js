function solve(inputArr) {
    let commandExecutor = (function () {
        let result = {};

        function create(arr) {
            if (arr.length > 2) {
                result[arr[0]] = Object.create(result[arr[2]]);
            } else {
                result[arr[0]] = {};
            }
        }

        function set(arr) {
            let name = arr[0];
            let key = arr[1];
            let value = arr[2];
            result[name][key] = value;
        }

        function print(arr) {
            let objName = arr[0];
            let obj = result[objName];
            let objects = [];

            for (let key in obj) {
                objects.push(`${key}:${obj[key]}`);
                //objects.push(`${key}:${obj.__proto_3_[key]}`);

        }
            console.log(objects.join(', '));
        }

        return {create, set, print};
    }());

    //input parse
    for (let command of inputArr) {
        let arr = command.split(" ");
        commandExecutor[arr[0]](arr.slice(1, arr.length));
    }
}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']);