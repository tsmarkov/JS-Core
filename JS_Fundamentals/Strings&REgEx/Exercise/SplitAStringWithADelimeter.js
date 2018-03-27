function splitByDelimeter(text, delimeter) {
    return text.split(delimeter).filter(x => x !== '').join('\n');
}