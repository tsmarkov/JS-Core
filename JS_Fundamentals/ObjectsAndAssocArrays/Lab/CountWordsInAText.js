function countWordsInAText(inputArray) {
    let words = inputArray[0].split(/\W+/).filter(x => x !== '');

    let result = {};
    for (let word of words) {
        if (!result.hasOwnProperty(word)) {
            result[word] = 0;
        }

        result[word]++;
    }

    return JSON.stringify(result);
}