function timer() {
    let hours = $('span#hours');
    let minutes = $('span#minutes');
    let seconds = $('span#seconds');

    let startBtn = $('#start-timer');
    let pauseBtn = $('#stop-timer');

    startBtn.click(start);
    pauseBtn.click(pause);

    let interval = null;

    function start() {
        if (interval) {
            clearInterval(interval);
        }

        interval = setInterval(step, 1000);

        startBtn.off();
        pauseBtn.click(pause);
    }

    function pause() {
        clearInterval(interval);

        startBtn.click(start);
        pauseBtn.off();
    }

    function step() {
        let currentHours = Number(hours.text());
        let currentMinutes = Number(minutes.text());
        let currentSeconds = Number(seconds.text());
        currentSeconds++;

        if (currentSeconds > 59) {
            currentSeconds = 0;
            currentMinutes++;
        }

        if (currentMinutes > 59) {
            currentMinutes = 0;
            currentHours++;
        }

        hours.text(`0${currentHours}`.slice(-2));
        minutes.text(`0${currentMinutes}`.slice(-2));
        seconds.text(`0${currentSeconds}`.slice(-2));
    }
}