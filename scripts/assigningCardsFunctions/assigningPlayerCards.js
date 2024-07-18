let firstPlayerHand = []
let secondPlayerHand = []
let flop;
let turn;
let river;
import { checkStreet } from '../checkingFunctions/checkCards.js'


function assigningKnownCards(street, cards) {
    if (cards[0].value && cards[1].value) {
        firstPlayerHand = [
            {
                firstCard: {
                    rank: cards[0].value.rank,
                    suit: cards[0].value.suit
                },
                secondCard: {
                    rank: cards[1].value.rank,
                    suit: cards[1].value.suit
                },
            }
        ];
    }

    if (cards[2].value && cards[3].value) {
        secondPlayerHand = [
            {
                firstCard: {
                    rank: cards[2].value.rank,
                    suit: cards[2].value.suit
                },
                secondCard: {
                    rank: cards[3].value.rank,
                    suit: cards[3].value.suit
                },
            }
        ];
    }

    if (street === 'Preflop') return { firstPlayerHand, secondPlayerHand, flop: {}, turn: {}, river: {} }

    if (street === 'Flop') {
        if (cards[4].value && cards[5].value && cards[6].value) {
            flop = [
                {
                    firstCard: {
                        rank: cards[4].value.rank,
                        suit: cards[4].value.suit
                    },
                    secondCard: {
                        rank: cards[5].value.rank,
                        suit: cards[5].value.suit
                    },
                    thirdCard: {
                        rank: cards[6].value.rank,
                        suit: cards[6].value.suit
                    },
                }
            ]
        }
        return { firstPlayerHand, secondPlayerHand, flop, turn: {}, river: {} }
    } else if (street === 'Turn') {
        if (cards[4].value && cards[5].value && cards[6].value) {
            flop = [
                {
                    firstCard: {
                        rank: cards[4].value.rank,
                        suit: cards[4].value.suit
                    },
                    secondCard: {
                        rank: cards[5].value.rank,
                        suit: cards[5].value.suit
                    },
                    thirdCard: {
                        rank: cards[6].value.rank,
                        suit: cards[6].value.suit
                    },
                }
            ]
        }
        if (cards[7].value) turn = { rank: cards[7].value.rank, suit: cards[7].value.suit }
        return { firstPlayerHand, secondPlayerHand, flop, turn, river: {} }
    } else if (street === 'River') {
        flop = [
            {
                firstCard: {
                    rank: cards[4].value.rank,
                    suit: cards[4].value.suit
                },
                secondCard: {
                    rank: cards[5].value.rank,
                    suit: cards[5].value.suit
                },
                thirdCard: {
                    rank: cards[6].value.rank,
                    suit: cards[6].value.suit
                },
            }
        ]
        if (cards[7].value) turn = { rank: cards[7].value.rank, suit: cards[7].value.suit }
        if (cards[8].value) river = { rank: cards[8].value.rank, suit: cards[8].value.suit }
        return { firstPlayerHand, secondPlayerHand, flop, turn, river }
    }
}

function allPlayerCards(cards, player, assignedKnownCards) {
    const allCards = []
    if (player == "firstPlayer") {
        allCards[0] = assignedKnownCards.firstPlayerHand[0].firstCard
        allCards[1] = assignedKnownCards.firstPlayerHand[0].secondCard

    } else if (player == "secondPlayer") {
        allCards[0] = assignedKnownCards.secondPlayerHand[0].firstCard
        allCards[1] = assignedKnownCards.secondPlayerHand[0].secondCard
    }
    if (checkStreet(cards) === 'Flop') {
        allCards[2] = assignedKnownCards.flop[0].firstCard
        allCards[3] = assignedKnownCards.flop[0].secondCard
        allCards[4] = assignedKnownCards.flop[0].thirdCard
    }
    if (checkStreet(cards) === 'Turn') {
        allCards[2] = assignedKnownCards.flop[0].firstCard
        allCards[3] = assignedKnownCards.flop[0].secondCard
        allCards[4] = assignedKnownCards.flop[0].thirdCard
        allCards[5] = assignedKnownCards.turn
    }
    if (checkStreet(cards) === 'River') {
        allCards[2] = assignedKnownCards.flop[0].firstCard
        allCards[3] = assignedKnownCards.flop[0].secondCard
        allCards[4] = assignedKnownCards.flop[0].thirdCard
        allCards[5] = assignedKnownCards.turn
        allCards[6] = assignedKnownCards.river
    }
    return allCards
}

export { assigningKnownCards, allPlayerCards }