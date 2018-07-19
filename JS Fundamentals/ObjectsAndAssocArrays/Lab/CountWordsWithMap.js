function countWordsWithMap(inputArray) {
    let words = inputArray[0].toLowerCase().split(/\W+/).filter(x => x !== '');
    let map = new Map();

    for (let word of words) {
        if (!map.has(word)) {
            map.set(word, 0);
        }

        map.set(word, map.get(word) + 1);
    }

    map = new Map([...map.entries()].sort());

    return Array.from(map).map(entry => `'${entry[0]}' -> ${entry[1]} times`).join('\n');
}