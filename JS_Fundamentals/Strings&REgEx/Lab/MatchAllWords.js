function matchAllWords(str) {
    let words = str.split(/\W+?/).filter(w => w !== '');
    return words.join('|')
}