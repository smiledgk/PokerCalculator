function checkPlayerCards(cards) {
    const cardsFiltered = cards.filter(card => card.isChosen === true).filter(card => card.name === 'FirstPlayerHand1' || card.name === 'FirstPlayerHand2' || card.name === 'SecondPlayerHand1' || card.name === 'SecondPlayerHand2')
    if (cardsFiltered.length === 4) return true
    else {
      alert('Input Player 1 and 2 Cards!')
    }
  }

function checkStreet(cards) {
    const cardsFiltered = cards.filter(card => card.isChosen === true)
    switch (cardsFiltered.length) {
        case 4:
            return "Preflop"
        case 5:
            return false
        case 6:
            return false
        case 7:
            return "Flop"
        case 8:
            return "Turn"
        case 9:
            return 'River'
    }
}

export { checkStreet, checkPlayerCards }