function createBook(selector, title, author, ISBN) {
    let id = 1;
    let bookDiv = $(`<div id="book${id++}">`)
        .append($(`<p class="title"></p>`).text(title))
        .append($(`<p class="author"></p>`).text(author))
        .append($(`<p class="isbn"></p>`).text(ISBN));

    let selectBtn = $('<button>Select</button>');
    let deselectBtn = $('<button>Deselect</button>');

    selectBtn.click(showSelection);
    deselectBtn.click(hideSelection);
    selectBtn.appendTo(bookDiv);
    deselectBtn.appendTo(bookDiv);

    bookDiv.appendTo($(selector));

    function showSelection() {
        $(this).parent().css('border', '2px solid blue');
    }

    function hideSelection() {
        $(this).parent().css('border', 'none');
    }
}