import { checkStreet } from './checkCards.js'
import { allPlayerCards, assigningKnownCards } from '../assigningCardsFunctions/assigningPlayerCards.js'
import { determineCombo } from '../checkCombosFunctions/checkWin.js'

function yourCurrentHand(player, cards) {
    const street = checkStreet(cards)
    const playerCards = allPlayerCards(cards, player, assigningKnownCards(street, cards))
    const playerCombo = determineCombo(playerCards)
    return playerCombo
}

export { yourCurrentHand }