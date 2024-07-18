import { closeCardsForChoicePopUp } from '../editMode/editMode.js'
import { addDeadCard } from './deadCards.js'
import { clearCardAnalysis } from './clearingCards.js'
import { removehighlightCards } from '../editMode/represent.js'

function assignCard(choiceCards, cards, replaceCard, newCard, isChoice = false, position) {
    const numberOfCardsInPosition = replaceCard.length
    const images = [];
    replaceCard.forEach((divElem) => {
        images.push(divElem.querySelector('img'))
    })
    let counter = 0
    for (let i = 0; i < numberOfCardsInPosition && counter < 1; i++) {
        if (!replaceCard[i].classList.contains('changed')) {
            const img = replaceCard[i].querySelector('img')
            replaceCard[i].classList.add('changed')
            img.src = `Files/Cards/${newCard.id}.png`;
            assignFaceDownCard(cards, newCard, replaceCard[i])
            addDeadCard(choiceCards, newCard)
            counter++
        }
    }
    if (isChoice && checkCardsFilledPosition(cards, position)) closeCardsForChoicePopUp(choiceCards, overlay, popup)
    if (document.querySelector('#bestCardsList')) {
        clearCardAnalysis();
        removehighlightCards();
    }
}

function assignFaceDownCard(cards, newCard, replaceCard) {
    const arrayCard = cards.find(facedownCard => facedownCard.name == replaceCard.id)
    arrayCard.isChosen = true
    arrayCard.tag = newCard.id
    arrayCard.value = {
        rank: extractCard(newCard.id).rank,
        suit: extractCard(newCard.id).suit
    }
}

function checkCardsFilledPosition(cards, position) {
    const arrayCards = cards.filter(card => card.name.replace(/\d/g, '') == position.replace('Hand1', 'FirstPlayerHand').replace('Hand2', 'SecondPlayerHand'))
    const nonChosenCards = arrayCards.filter(card => card.isChosen === false);
    return nonChosenCards.length !== 0 ? false : true;
}

function extractCard(card) {
    const parts = card.split('_');
    let rank = parts[0];
    let suit = parts[2];
    suit = suit[0].toUpperCase() + suit.slice(1)
    if (rank.length > 1) rank = rank[0].toUpperCase() + rank.slice(1)
    return { rank, suit };
}

export { assignCard };