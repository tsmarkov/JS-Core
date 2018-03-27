function movieTickets(arr) {
    let [movieName, day] = arr;

    let ticketPrice = 0;

    switch (movieName.toLowerCase()) {
        case 'the godfather':
            switch (day.toLowerCase()) {
                case 'monday':
                    ticketPrice = 12;
                    break;
                case 'tuesday':
                    ticketPrice = 10;
                    break;
                case 'thursday':
                    ticketPrice = 12.50;
                    break;
                case 'wednesday':
                case 'friday':
                    ticketPrice = 15;
                    break;
                case 'saturday':
                    ticketPrice = 25;
                    break;
                case 'sunday':
                    ticketPrice = 30;
                    break;
                default:
                    ticketPrice = 'error';
            }
            break;
        case 'schindler\'s list':
            switch (day.toLowerCase()) {
                case 'monday':
                case 'tuesday':
                case 'wednesday':
                case 'thursday':
                case 'friday':
                    ticketPrice = 8.50;
                    break;
                case 'saturday':
                case 'sunday':
                    ticketPrice = 15;
                    break;
                default:
                    ticketPrice = 'error';
            }
            break;
        case 'casablanca':
            switch (day.toLowerCase()) {
                case 'monday':
                case 'tuesday':
                case 'wednesday':
                case 'thursday':
                case 'friday':
                    ticketPrice = 8;
                    break;
                case 'saturday':
                case 'sunday':
                    ticketPrice = 10;
                    break;
                default:
                    ticketPrice = 'error';
            }
            break;
        case 'the wizard of oz':
            switch (day.toLowerCase()) {
                case 'monday':
                case 'tuesday':
                case 'wednesday':
                case 'thursday':
                case 'friday':
                    ticketPrice = 10;
                    break;
                case 'saturday':
                case 'sunday':
                    ticketPrice = 15;
                    break;
                default:
                    ticketPrice = 'error';
            }
            break;
        default:
            ticketPrice = 'error';
    }

    return ticketPrice;
}