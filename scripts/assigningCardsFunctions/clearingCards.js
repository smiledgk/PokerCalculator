import { removeDeadCard } from './deadCards.js'
import { removehighlightCards } from '../editMode/represent.js'

function deletePosition(cards, position, choiceCards) {
    unassignFaceDownCards(position)
    removeDeadCard(cards, position, choiceCards)
    if (document.querySelector('#bestCardsList')) {
        clearCardAnalysis();
        removehighlightCards();
    }
}

function clearCardAnalysis() {
    if (bestCardsList) bestCardsList.innerHTML = ''
    if (piechart) piechart.innerHTML = ''
    if (outsList) outsList.innerHTML = ''
}

function unassignFaceDownCards(position) {
    const cardDivs = document.querySelectorAll(`#${position} .card`)
    cardDivs.forEach(card => {
        card.classList.remove('changed')
        card.querySelector('img').src = 'Files/CardFaceDown.png'
    })
}

export { deletePosition, clearCardAnalysis, unassignFaceDownCards }