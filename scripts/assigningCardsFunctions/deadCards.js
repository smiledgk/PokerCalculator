const deadCards = []
function addDeadCard(choiceCards, newCard) {
    deadCards.push(newCard)
    choiceCards.forEach(card => {
        if (card.id === newCard.id) {
            card.style.visibility = 'hidden';
            card.classList.add('inUse')
        }
    });
}

function removeDeadCard(cards, position, choiceCards) {
    const arrayCards = cards.filter(card => card.name.replace(/\d/g, '') == position.replace('Hand1', 'FirstPlayerHand').replace('Hand2', 'SecondPlayerHand'))
    const cardTags = []
    arrayCards.map(card => {
      card.isChosen = false;
      cardTags.push(card.tag)
      delete card.tag
      delete card.value
    })
    choiceCards.forEach(card => {
      if (cardTags.includes(card.id)) {
        if (card.classList.contains('inUse')) card.classList.remove('inUse')
        card.style.visibility = 'visible';
      }
    })
  }

export { addDeadCard, removeDeadCard }