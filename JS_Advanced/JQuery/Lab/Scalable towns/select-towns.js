function attachEvents() {
    let towns = $('#items').find('li').click(select);
    let showTownsBtn = $('#showTownsButton').click(showTowns);

    let selectedTowns = {};

    function showTowns() {
        $('#selectedTowns').text(`${Object.keys(selectedTowns).join(', ')}`)
    }

    function select() {
        let town = $(this);
        let townName = town.text();
        console.log(townName);

        if (town.attr('data-selected') === "true") {
            town.attr('data-selected', "false");
            town.css('background-color', '');
            delete selectedTowns[townName];
        } else {
            town.attr('data-selected', "true");
            town.css('background-color', '#DDD');
            selectedTowns[townName] = townName;
        }
    }
}