function move(command) {
    let leftSelector = $('#available-towns');
    let rightSelector = $('#selected-towns');

    if (command === "left") {
        let town = $(rightSelector).find(':selected');
        $(town).appendTo(leftSelector);
    } else if (command === "right") {
        let town = $(leftSelector).find(':selected');
        $(town).appendTo(rightSelector);
    } else if (command === "print") {
        let townsNames = [];

        for (let townOption of $(rightSelector).children().toArray()) {
            townsNames.push(townOption.textContent)
        }

        $('#output').text(townsNames.join("; "));
    }
}
