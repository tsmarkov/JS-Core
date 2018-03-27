function printLetters(str) {
    str.split('').forEach((l, i) => {
        console.log(`str[${i}] -> ${l}`)
    });
}