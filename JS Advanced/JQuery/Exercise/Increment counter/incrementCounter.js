function increment(container) {
    let container = $(container);
    let textArea = container.find('textarea.counter');
    let incrementButton = container.find('#incrementBtn');
    let addButton = container.find('#addBtn');
    let resultsUl = container.find('ul.results');

    let value = 0;
    textAreaUpdate();

    incrementButton.click(incrementValue);
    addButton.click(addValue);

    function incrementValue() {
        value++;
        textAreaUpdate();
    }

    function addValue() {
        let li = $(`<li>${value}</li>`);
        li.appendTo(resultsUl);
    }

    function textAreaUpdate() {
        textArea.val(value);
    }
}

//function increment(selector) {
//
//     let container = $(selector);
//     let fragment = document.createDocumentFragment();
//     let text = $('<textarea class="counter" disabled="disabled">');
//     let incrementBtn = $('<button class="btn" id="incrementBtn">Increment</button>');
//     let addBtn = $('<button class="btn" id="addBtn">Add</button>');
//     let ul = $('<ul class="results">');
//
//     text.val(0);
//     incrementBtn.click(() => {
//         text.val(+text.val() + 1);
//     });
//
//     addBtn.click(() => {
//         let li = $(`<li>${text.val()}</li>`);
//         li.appendTo(ul);
//     });
//
//     text.appendTo(fragment);
//     incrementBtn.appendTo(fragment);
//     addBtn.appendTo(fragment);
//     ul.appendTo(fragment);
//
//     container.append(fragment);
// }