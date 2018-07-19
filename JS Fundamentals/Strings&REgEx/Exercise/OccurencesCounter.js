function occurencesCount(text, word) {
    text = text.toLowerCase();
    let regex = new RegExp('\\b' + word.toLowerCase() + '\\b', 'gm');
    let matches = regex.exec(text);

    let counter = 0;
    while (matches !== null) {
        counter++;
        matches = regex.exec(text);
    }

    return counter;
}

console.log(
    occurencesCount(
        `The waterfall was so high, that the child couldn’t see its peak.`,
        'the'
    )
);
