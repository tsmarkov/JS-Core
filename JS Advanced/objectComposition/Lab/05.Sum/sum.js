function calc() {
    let element1, element2, result;

    return {
        init: (selector1, selector2, resultSelector) => {
            element1 = $(selector1);
            element2 = $(selector2);
            result = $(resultSelector);
        },
        add: () => {
            result.val(Number(element1.val()) + Number(element2.val()))
        },
        subtract: () => {
            result.val(Number(element1.val()) - Number(element2.val()))
        }
    }
}