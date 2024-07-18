import { checkStreet } from "../checkingFunctions/checkCards.js"
import { allPlayerCards, assigningKnownCards } from "./assigningPlayerCards.js"
import { ranks, suits } from "../fillingfunctions/helperVariables.js"

function gettingRemainingCards(cards) {
    const street = checkStreet(cards)
    const cards1 = allPlayerCards(cards, 'firstPlayer', assigningKnownCards(street, cards))
    const cards2 = allPlayerCards(cards, 'secondPlayer', assigningKnownCards(street, cards)).slice(0, 2)
    const cardsTotal = cards1.concat(cards2)
    const allCards = []
    for (let suit1 of suits) {
        for (let i = 0; i < ranks.length; i++) {
            allCards.push({ rank: ranks[i], suit: suit1 })
        }
    }
    const remainingCards = allCards.filter(card => !cardsTotal.some(c => c.rank === card.rank && c.suit === card.suit))
    return remainingCards
}

export { gettingRemainingCards }