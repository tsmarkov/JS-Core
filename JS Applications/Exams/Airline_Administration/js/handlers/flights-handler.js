let flightsHandler = (() => {
    const NAVIGATION = './templates/common/navigation.hbs';
    const FOOTER = './templates/common/footer.hbs';

    function displayCatalog(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            flights.getPublicFlights()
                .then(function (flights) {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.flights = flights;

                    ctx.loadPartials({
                        navigation: NAVIGATION,
                        footer: FOOTER,
                        addedFlight: './templates/flights/addedFlight.hbs'
                    }).then(function () {
                        this.partial('./templates/flights/flightsCatalog.hbs');
                    });
                });
        }
    }

    function displayCreateFlight(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                navigation: NAVIGATION,
                footer: FOOTER,
            }).then(function () {
                this.partial('./templates/forms/addFlightForm.hbs');
            });
        }
    }

    function createFlight(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            let isAuth = auth.isAuth();
            let author = sessionStorage.getItem('username');
            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departure = ctx.params.departureDate;
            let departureHour = ctx.params.departureTime;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let image = ctx.params.img;
            let isPublic = ctx.params.public;

            if (!destination.trim()) {
                notify.showError('Destination should not be empty')
            } else if (!origin.trim()) {
                notify.showError('Origin should not be empty')
            } else if (Math.sign(seats) !== 1) {
                notify.showError('Seats count should be positive number')
            } else if (Math.sign(cost) !== 1) {
                notify.showError('Cost per seat should be positive number')
            } else {
                flights.createFlight(destination, origin, departure, departureHour, seats, cost, image, isPublic)
                    .then(function () {
                        notify.showInfo(`Created flight.`);
                        ctx.redirect('#/flights');
                    })
                    .catch(notify.handleError);
            }
        }
    }

    function displayFlightDetails(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            let flightId = ctx.params.id;

            flights.getFlightById(flightId)
                .then(function (flight) {
                    ctx.isAuth = auth.isAuth();
                    ctx.isAuthor = flight._acl.creator === sessionStorage.getItem('userId');
                    ctx.username = sessionStorage.getItem('username');
                    ctx.flight = flight;

                    ctx.loadPartials({
                        navigation: NAVIGATION,
                        footer: FOOTER
                    }).then(function () {
                        this.partial('./templates/flights/flightDetails.hbs');
                    });
                }).catch(notify.handleError)
        }
    }

    function displayEditFlight(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            let flightId = ctx.params.id;

            flights.getFlightById(flightId)
                .then(function (flight) {
                    if (flight._acl.creator !== sessionStorage.getItem('userId')) {
                        ctx.redirect('#/flights');
                    }

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.flight = flight;
                    ctx.public = undefined;

                    if(flight.isPublic === "true"){
                        ctx.public = true;
                    }

                    ctx.loadPartials({
                        navigation: NAVIGATION,
                        footer: FOOTER
                    }).then(function () {
                        this.partial('./templates/forms/editFlightForm.hbs');
                    });
                }).catch(notify.handleError);
        }
    }

    function editFlight(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            let isAuth = auth.isAuth();
            let author = sessionStorage.getItem('username');
            let flightId = ctx.params.flightId;
            let destination = ctx.params.destination;
            let origin = ctx.params.origin;
            let departure = ctx.params.departureDate;
            let departureHour = ctx.params.departureTime;
            let seats = ctx.params.seats;
            let cost = ctx.params.cost;
            let image = ctx.params.img;
            let isPublic = ctx.params.public;

            if (!destination.trim()) {
                notify.showError('Destination should not be empty')
            } else if (!origin.trim()) {
                notify.showError('Origin should not be empty')
            } else if (Math.sign(seats) !== 1) {
                notify.showError('Seats count should be positive number')
            } else if (Math.sign(cost) !== 1) {
                notify.showError('Cost per seat should be positive number')
            } else {
                flights.editFlight(destination, origin, departure, departureHour, seats, cost, image, isPublic, flightId)
                    .then(function () {
                        notify.showInfo(`Successfully edited flight.`);
                        ctx.redirect(`#/details/flight/${flightId}`);
                    })
                    .catch(notify.handleError);
            }
        }
    }

    function deleteFlight(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            let flightId = ctx.params.id;
            flights.getFlightById(flightId)
                .then(function (flight) {
                    if (flight._acl.creator !== sessionStorage.getItem('userId')) {
                        ctx.redirect('#/flights');
                    }
                });


            flights.deleteFlight(flightId)
                .then(function () {
                    notify.showInfo('Flight deleted.');
                    ctx.redirect('#/my_flights');
                }).catch(notify.handleError);
        }
    }

    function displayMyFlights(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/login');
        } else {
            let userId = sessionStorage.getItem('userId');

            flights.getAllMyFlights(userId)
                .then(function (flights) {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.flights = flights;

                    ctx.loadPartials({
                        footer: FOOTER,
                        navigation: NAVIGATION,
                        myFlight: './templates/flights/myFlight.hbs'
                    }).then(function () {
                        this.partial('./templates/flights/myFlights.hbs');
                    });
                });
        }
    }

    return {
        displayCatalog,
        displayCreateFlight,
        createFlight,
        displayEditFlight,
        editFlight,
        deleteFlight,
        displayMyFlights,
        displayFlightDetails
    };
})();