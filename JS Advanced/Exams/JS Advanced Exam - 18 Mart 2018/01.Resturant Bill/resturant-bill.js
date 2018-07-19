function addProduct() {
    let products = {};
    let productsTable = $('#product-list');

    //Inputs
    let inputs = $('input');
    let productName = inputs[0];
    let productPrice = inputs[1];

    if ($(productName).val() !== "" && $(productPrice).val() !== "") {
        //New Product Append
        let newProduct = $(`<tr><td>${$(productName).val()}</td><td>${$(productPrice).val()}</td></tr>`);
        $(productsTable).append(newProduct);

        let prices = productsTable.find('tr td');
        let sum = 0;
        for (let i = 0; i < prices.length; i += 2) {
            sum += Number($(prices[i + 1]).text());
        }

        let total = $('tfoot td:last-child');
        total.text(sum);
    }

    //Empty input fields
    $(productName).val("");
    $(productPrice).val("");
}