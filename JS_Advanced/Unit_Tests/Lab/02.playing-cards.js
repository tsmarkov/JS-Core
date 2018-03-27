function makeCard(face, suit) {
    const cardFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const cardSuits = {'S': "\u2660", 'H': '\u2665', 'D': '\u2666', 'C': '\u2663'};

    if (cardFaces.indexOf(face) < 0 || !cardSuits.hasOwnProperty(suit)) {
        throw new Error();
    }

    return {
        face: face,
        suit: cardSuits[suit],
        toString: function () {
            return this.face + this.suit;
        }
    }
}