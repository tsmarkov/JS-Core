let solution = (function () {
    return {
        add: (firstVector, secondVector) => {
            return [firstVector[0] + secondVector[0],
                firstVector[1] + secondVector[1]];
        },
        multiply: (vector, scalar) => {
            return [vector[0] * scalar, vector[1] * scalar];
        },
        length: (vector) => {
            return Math.sqrt(vector[0] * vector[0] + (-vector[1]) * (-vector[1]));
        },
        dot: (firstVector, secondVector) => {
            return (firstVector[0] * secondVector[0]) + (firstVector[1] * secondVector[1]);
        },
        cross: (firstVector, secondVector) => {
            return (firstVector[0] * secondVector[1]) - (firstVector[1] * secondVector[0]);
        }
    }
})();

console.log(solution.add([1, 1], [1, 0]));
console.log(solution.multiply([3.5, -2], 2));
console.log(solution.length([3, -4]));
console.log(solution.dot([1, 0], [0, -1]));
console.log(solution.cross([3, 7], [1, 0]));