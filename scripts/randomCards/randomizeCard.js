import { ranks, suits } from '../fillingfunctions/helperVariables.js'

function randomizeCard(deadCards) {
    let card;
    do {
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        card = {
            rank: rank,
            suit: suit
        }
    } while ((deadCards.some(deadCard => deadCard.rank === card.rank && deadCard.suit === card.suit)))
    return card
}

export { randomizeCard }