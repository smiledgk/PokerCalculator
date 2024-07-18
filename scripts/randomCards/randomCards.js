import { removeDeadCard } from '../assigningCardsFunctions/deadCards.js'
import { unassignFaceDownCards } from '../assigningCardsFunctions/clearingCards.js'
import { ranks, suits, randomNumbers } from '../fillingfunctions/helperVariables.js'
import { assignCard } from '../assigningCardsFunctions/assignCards.js'

async function randomizeCards(cards, position, choiceCards) {
    await unassignFaceDownCards(position)
    await removeDeadCard(cards, position, choiceCards)
    const replaceCard = document.querySelectorAll(`#${position} .card`)
    for (let card of replaceCard) {
        const newCard = findAvailableRandomCard(choiceCards)
        assignCard(choiceCards, cards, replaceCard, newCard)
    }
}

function findAvailableRandomCard(choiceCards) {
    let newCard;
    for (let i = 0; i < 100000; i++) {
        newCard = choiceCards[randomNumbers(suits.length * ranks.length)]
        if (!newCard.classList.contains('inUse')) return newCard
    }
}

export { randomizeCards }