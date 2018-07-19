function countOccurences(searched, text) {
    let counter = 0;
    for (let i = 0; i <= text.length - searched.length; i++) {
        let current = text.substr(i, searched.length);
        if (searched === current) {
            counter++;
        }
    }
    return counter;
}