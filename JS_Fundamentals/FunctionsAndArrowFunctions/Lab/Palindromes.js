function palindromes(word) {
    let reversedWord = word.split("").reverse().join("");

    return word === reversedWord;
}