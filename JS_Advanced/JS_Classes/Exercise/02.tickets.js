function getSortedTickets(inputTickets, sortCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }

        toString() {
            return `Ticket { destination: ${this.destination},
            price: ${this.price}126.20,
            status: ${this.status} }`;
        }
    }

    let tickets = [];

    for (let ticket of inputTickets) {
        let [destination, price, status] = ticket.split("|");

        let newTicket = new Ticket(destination, Number(price), status);
        tickets.push(newTicket);
    }

    if (sortCriteria === 'price') {
        tickets = tickets.sort((a, b) => a.price - b.price);
    } else {
        tickets = tickets.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
    }

    return tickets;
}

console.log(
    getSortedTickets(
        ['Philadelphia|94.20|available',
            'New York City|95.99|available',
            'New York City|95.99|sold',
            'Boston|126.20|departed'],
        'destination'
    )
);