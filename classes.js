import { ranks, suits, allCombos } from "./cardDeckCombos.js";

class Card {
    constructor(data) {
        this.rank = data.rank;
        this.suit = data.suit;
    }
}

class PokerHand {
    constructor(cards, markup) {
        this.cards = cards;
        this.markup = markup;
    }
}

class Flop {
    constructor(cards) {
        this.cards = cards;
    }
}

class Turn {
    constructor(card) {
        this.card = card;
    }
}

class River {
    constructor(card) {
        this.card = card;
    }
}

class MarkUpCombo {
    constructor(data) {
        this.markup = data.markup;
        this.type = data.type;
        this.EV = parseFloat(data.EV);
        this.rank = data.rank;
        this.rangeRanking = parseFloat(data.rangeRanking);
        this.category = data.category;
        this.combinations = data.combinations.map(combo => combo.map(cardData => new Card(cardData)));
        this.comboMarkups = data.comboMarkups;
        this.numberOfCombos = data.numberOfCombos;
    }
}

function cardDeck() {
    let deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            const card = new Card({rank, suit});
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

const deck = cardDeck()
const shuffledDeck = shuffleDeck(deck)
console.log(shuffledDeck)