function initializeTable() {
    $('#createLink').click(addCountry);

    createCountry('Bulgaria', 'Sofia');
    createCountry('Germany', 'Berlin');
    createCountry('Russia', 'Moscow');

    function addCountry() {
        let country = $('#newCountryText').val();
        let capital = $('#newCapitalText').val();
        createCountry(country, capital);
    }

    function createCountry(country, capital) {
        $('<tr>')
            .append(`<td>${country}</td>`)
            .append(`<td>${capital}</td>`)
            .append($('<td>')
                .append($('<a href="#">[Up]</a>').click(moveUp))
                .append($('<a href="#">[Down]</a>').click(moveDown))
                .append($('<a href="#">[Delete]</a>').click(deleteRow)))
            .appendTo('#countriesTable');

        fixRows();
    }

    function moveUp() {
        let currentRow = $(this).parent().parent();
        let previousRow = currentRow.prev();

        currentRow.fadeOut();
        previousRow.fadeOut();

        currentRow.insertBefore(previousRow);

        currentRow.fadeIn();
        previousRow.fadeIn();

        fixRows();
    }

    function moveDown() {
        let currentRow = $(this).parent().parent();
        let nextRow = currentRow.next();

        currentRow.fadeOut();
        nextRow.fadeOut();

        currentRow.insertAfter(nextRow);

        currentRow.fadeIn();
        nextRow.fadeIn();

        fixRows();
    }

    function deleteRow() {
        $(this).parent().parent().remove();
        fixRows();
    }

    function fixRows() {
        let tableBody = $('#countriesTable').find('tbody');

        let gugutki = tableBody
            .find('tr td a')
            .toArray()
            .map(e => e.style.display = 'inline');

        tableBody
            .find('tr:last-child  td:last-child a:nth-child(2)')
            .css('display', 'none');

        tableBody
            .find('tr:nth-child(3)  td:last-child a:nth-child(1)')
            .css('display', 'none');
    }
}