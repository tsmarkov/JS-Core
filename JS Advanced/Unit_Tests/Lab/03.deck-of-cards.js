function deckOfCards(cards) {
    function createCard(face, suit) {
        let validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let validSuits = {
            S: '\u2660',
            H: '\u2665',
            D: '\u2666',
            C: '\u2663'
        };

        if (!validFaces.includes(face)) {
            throw new Error(`invalid card face: ${face}`);
        }

        if (!validSuits.hasOwnProperty(suit)) {
            throw new Error(`Invalid card suit: ${suit}`);
        }

        return card = {
            face,
            suit,
            toString: function () {
                return face + validSuits[suit];
            }
        };
    }

    let deck = [];

    for (let card of cards) {
        let face = card.substring(0, card.length - 1);
        let suit = card.substr(card.length - 1, 1);

        try {
            deck.push(createCard(face, suit));
        } catch (err) {
            console.log(`Invalid card: ${card}`);
            return;
        }
    }

    console.log(deck.join(" "));
}