function attachEventsListeners() {
    let buttons = $(':button');
    buttons.click(convert);

    function convert() {
        let clickedId = this.id;
        let clickedValue = $(this.previousElementSibling).val();
        let valueToDays = null;

        if (clickedId === 'daysBtn') {
            valueToDays = +clickedValue;
        } else if (clickedId === 'hoursBtn') {
            valueToDays = +clickedValue / 24;
        } else if (clickedId === 'minutesBtn') {
            valueToDays = +clickedValue / 1440;
        } else if (clickedId === 'secondsBtn') {
            valueToDays = +clickedValue / 86400;
        }

        $(buttons[0].previousElementSibling).val(valueToDays);
        $(buttons[1].previousElementSibling).val(valueToDays * 24);
        $(buttons[2].previousElementSibling).val(valueToDays * 1440);
        $(buttons[3].previousElementSibling).val(valueToDays * 86400);
    }
}