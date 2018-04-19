$(() => {
    const app = Sammy('#container', function () {
        this.use("")
    });

    app.run();
});