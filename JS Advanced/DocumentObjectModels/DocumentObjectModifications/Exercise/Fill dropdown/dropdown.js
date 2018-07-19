function addItem() {
    let menu = document.getElementById('menu');
    let newItemText = document.getElementById('newItemText').value;
    let newItemValue = document.getElementById('newItemValue').value;

    let option = document.createElement('option');
    option.textContent = newItemText;
    option.value = newItemValue;

    menu.appendChild(option);

    document.getElementById('newItemText').value = '';
    document.getElementById('newItemValue').value = '';
}

// function addItem() {
//
//     let itemText = document.getElementById('newItemText').value;
//     let itemValue = document.getElementById('newItemValue').value;
//
//     let optionTag = document.createElement('option')
//     optionTag.value = itemValue;
//     optionTag.textContent = itemText;
//
//     let selectTag = document.querySelector('#menu');
//     selectTag.appendChild(optionTag);
//
//     document.getElementById('newItemText').value = '';
//     document.getElementById('newItemValue').value = '';
//
// }