$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get("index.html", authHandler.displayLogin);
        this.get("#/login", authHandler.displayLogin);
        this.post("#/login", authHandler.login);

        this.get("#/register", authHandler.displayRegister);
        this.post("#/register", authHandler.register);

        this.get("#/logout", authHandler.logout);

        this.get("#/flights", flightsHandler.displayCatalog);

        this.get("#/add/flight", flightsHandler.displayCreateFlight);
        this.post("#/add/flight", flightsHandler.createFlight);

        this.get("#/details/flight/:id", flightsHandler.displayFlightDetails);

        this.get("#/edit/flight/:id", flightsHandler.displayEditFlight);
        this.post("#/edit/flight", flightsHandler.editFlight);

        this.get("#/my_flights", flightsHandler.displayMyFlights);

        this.get("#/remove/flight/:id", flightsHandler.deleteFlight);
    });

    app.run();
});