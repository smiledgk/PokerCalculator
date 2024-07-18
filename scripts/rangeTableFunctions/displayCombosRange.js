const displayHandMarkupsContainer = document.querySelectorAll('.displayHandMarkupsContainer')
function displayCombos(player, currentRanges) {
    let displayContainer
    let markups
    if (player === 'player1') {
        displayContainer = displayHandMarkupsContainer[0]
        markups = currentRanges.player1.map(combo => combo.markup)
    }
    else {
        displayContainer = displayHandMarkupsContainer[1]
        markups = currentRanges.player2.map(combo => combo.markup)
    }
    displayContainer.innerText = ''
    const input = markups.join(', ')
    displayContainer.innerText = input
}

export { displayCombos }