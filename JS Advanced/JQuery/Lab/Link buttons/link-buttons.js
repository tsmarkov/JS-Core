function attachEvents() {
    let buttons = $('.button');
    buttons.click(a);

    function a() {
        buttons.removeClass('selected');
        $(this).addClass('selected');
    }
}