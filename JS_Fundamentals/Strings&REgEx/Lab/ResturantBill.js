function resturantBill(arr) {
    let products = arr.filter((e, i) => i % 2 === 0).join(', ');
    let price = arr.filter((e, i) => i % 2 !== 0).map(e => Number(e)).reduce((a, b) => a + b);

    return `You purchased ${products} for a total sum of ${price}`;
}