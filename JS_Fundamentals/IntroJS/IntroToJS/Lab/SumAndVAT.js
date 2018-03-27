function sumAndVAT(a) {
    let sum = 0;
    
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }

    let vat = sum * 0.2;
    let total = sum + vat;

    console.log('sum = ' + sum);
    console.log('VAT = ' + vat);
    console.log('total = ' + total);
}

sumAndVAT(12);