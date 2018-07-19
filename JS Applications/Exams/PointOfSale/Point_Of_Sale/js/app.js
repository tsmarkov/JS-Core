$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', receiptsHandler.displayWelcomePage);
        this.get('#/welcome', receiptsHandler.displayWelcomePage);

        this.post('#/register', authHandler.registerUser);

        this.post('#/login', authHandler.loginUser);

        this.get('#/logout', authHandler.logoutUser);

        this.get('#/home', receiptsHandler.displayHome);
        this.get('#/currentReceipt', receiptsHandler.displayHome);

        this.get('#/')
    });

    app.run();
});