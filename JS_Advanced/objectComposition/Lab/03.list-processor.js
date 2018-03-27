//Revealing module pattern
function solution(arr) {
    let commandExecutor = (function () {
        let arr = [];

        function add(str) {
            arr.push(str);
        }

        function remove(str) {
            arr = arr.filter(s => s !== str);
        }

        function print() {
            console.log(arr.join(","));
        }

        return {add, remove, print};
    }());

    for (let str of arr) {
        let [command, value] = str.split(" ");
        commandExecutor[command](value);
    }
}

solution(['add pesho', 'add gosho', "add pesho", "remove pesho", "print"]);