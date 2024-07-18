import { allPlayerCards, assigningKnownCards } from "../assigningCardsFunctions/assigningPlayerCards.js"
import { checkStreet } from "../checkingFunctions/checkCards.js"
import { determineCombo } from "../checkCombosFunctions/checkWin.js"

function getAllCombos(cards, player, remainingCards) {
    const street = checkStreet(cards)
    const playerCards = allPlayerCards(cards, player, assigningKnownCards(street, cards))
    const result = []
    for (let nextCard of remainingCards) {
        const existingCards = [...playerCards]
        existingCards.push(nextCard)
        const combo = determineCombo(existingCards)
        result.push({ nextCard, combo })
    }
    return result
}

export { getAllCombos }