"use strict";

function commandProcessor(commandsArr = []) {
    let funkciq = (function () {
        let str = "";

        function append(value) {
            str += value;
        }

        function removeStart(firstIndexes) {
            firstIndexes = Number(firstIndexes);
            str = str.substring(firstIndexes, str.length);
        }

        function removeEnd(lastIndexes) {
            lastIndexes = Number(lastIndexes);
            str = str.substring(0, str.length - lastIndexes);
        }

        function print() {
            console.log(str);
        }

        return {append, removeStart, removeEnd, print}
    }());

    for (let commandParams of commandsArr) {
        let [command, value] = commandParams.split(" ");

        funkciq[command](value);
    }
}

commandProcessor(['append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print']);