function capitalizeTheWords(str) {
    let words = str.split(/\s+?/).filter(x => x !== '');

    for (let word of words) {
        let currentWord = word.toLowerCase();
        currentWord = currentWord.replace(word[0].toLowerCase(), word[0].toUpperCase());
        str = str.replace(word, currentWord);
    }

    return str;
}