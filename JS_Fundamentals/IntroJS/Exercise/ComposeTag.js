function composeTag(arr) {
    let [fileLocation, alternateText] = arr;

    return `<img src="${fileLocation}" alt="${alternateText}">`;
}