function storeCatalogue(arr = []) {
    let catalogue = new Map();

    for (let line of arr) {
        let splitLine = line.split(' : ');
        let [productName, productPrice] = [splitLine[0], Number(splitLine[1])];

        if (!catalogue.has(productName)) {
            catalogue.set(productName, undefined);
        }

        catalogue.set(productName, productPrice);
    }

    catalogue = [...catalogue].sort();

    let output = '';

    let firstLetter = null;
    for (let product of catalogue) {
        if (product[0][0] !== firstLetter) {
            firstLetter = product[0][0];
            output += `${product[0][0]}\n`;
        }

        output += `  ${product[0]}: ${product[1]}\n`;
    }

    return output;
}