function sortArrayByLengthAndValue(arr) {
    arr = arr.sort((a, b) => {
        return a.length === b.length ?
            a.toLowerCase() > b.toLowerCase() :
            a.length - b.length;
    });


    return arr.join('\n');
}

console.log(sortArrayByLengthAndValue(['Isacc', 'Theodor', 'Jack', 'Harrison', 'Ge+orge']));