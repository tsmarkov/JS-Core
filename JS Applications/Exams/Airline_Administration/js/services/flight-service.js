let flights = (() => {
    function getPublicFlights() {
        let endpoint = `flights?query={"isPublic":"true"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function createFlight(destination, origin, departure, departureHour, seats, cost, image, isPublic) {
        isPublic = !!isPublic;

        let data = {
            destination,
            origin,
            departure,
            departureHour,
            seats,
            cost,
            image,
            isPublic
        };

        return remote.post('appdata', 'flights', 'kinvey', data);
    }

    function editFlight(destination, origin, departure, departureHour, seats, cost, image, isPublic, flightId) {
        isPublic = !!isPublic;

        let endpoint = `flights/${flightId}`;

        let data = {
            destination,
            origin,
            departure,
            departureHour,
            seats,
            cost,
            image,
            isPublic
        };

        return remote.update('appdata', endpoint, 'kinvey', data);
    }

    function deleteFlight(flightId) {
        let endpoint = `flights/${flightId}`;

        return remote.remove('appdata', endpoint, 'kinvey');
    }

    function getAllMyFlights(authorId) {
        let endpoint = `flights?query={"_acl.creator":"${authorId}"}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    function getFlightById(flightId) {
        let endpoint = `flights/${flightId}`;

        return remote.get('appdata', endpoint, 'kinvey');
    }

    return {
        getPublicFlights,
        createFlight,
        editFlight,
        deleteFlight,
        getAllMyFlights,
        getFlightById
    };
})();