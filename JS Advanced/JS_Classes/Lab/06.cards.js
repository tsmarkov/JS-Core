let result = (function () {
    const SUITS = {
        SPADES: '♠',
        HEARTS: '♥',
        DIAMONDS: '♦',
        CLUBS: '♣'
    };

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this._face;
        }

        set face(face) {
            switch (face) {
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "10":
                case "J":
                case "Q":
                case "K":
                case "A":
                    break;
                default:
                    throw new Error();
            }

            this._face = face;
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            let hasCard = Object.keys(SUITS).filter(e => SUITS[e] === suit).length > 0;
            if (!hasCard || suit === undefined) {
                throw new Error();
            }


            this._suit = suit;
        }
    }

    return {
        Suits: SUITS,
        Card: Card
    }
})()

let Card = result.Card;
let Suits = result.Suits;

// let card1 = new Card("1", Suits.CLUBS) //FIRGA SI EKSEPSHON
// let card2 = new Card("2",Suits.Pesho); //NE FIRGA NISHTO
let card3 = new Card("3",'hearts'); //NE FIRGA NISHTO
