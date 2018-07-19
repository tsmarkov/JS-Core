function create(arr) {
    for (let str of arr) {
        $('<div>')
            .append($(`<p>${str}</p>`)
                .css('display', 'none'))
            .click(showParagraph)
            .appendTo($('#content'));
    }

    function showParagraph() {
        $(this).find('p').css('display', 'block');
    }
}