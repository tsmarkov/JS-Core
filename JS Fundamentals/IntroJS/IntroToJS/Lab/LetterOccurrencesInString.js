function letterOccurrencesInString(string, letter) {
    let count = 0;
    for (var i = 0; i < string.length; i++) {
        if (string[i] === letter) {
            count = count + 1;
        }
    }

    console.log(count);
}