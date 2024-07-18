import { displayCombos } from "./displayCombosRange.js";

function updateRangeCell(markup, currentRange, player, currentRanges, totalRange) {
    const clicked = totalRange.find(combo => combo.markup === markup);
    if (!currentRange.some(item => isEqualCombo(item, clicked))) {
        if (player === 'player1') currentRanges.player1.push(clicked);
        else if (player === 'player2') currentRanges.player2.push(clicked);
    }
    displayCombos(player, currentRanges)
}

function updateRangeCategory(player, category, comboCellsPlayers, totalRange) {
    let currentRange;
    let comboCells;
    if (player === 'player1') {
        comboCells = comboCellsPlayers[0];
    } else if (player === 'player2') {
        comboCells = comboCellsPlayers[1];
    }
    if (comboCells) {
        for (const cell of comboCells) {
            const buttonCategory = JSON.parse(cell.dataset.category);
            if (buttonCategory === category) {
                cell.classList.add('highlight-button');
                currentRange = totalRange.filter(combo => combo.category === category);
            } else {
                cell.classList.remove('highlight-button');
            }
        }
    }
    console.log(currentRange)
    return currentRange
}


function updateRangeBar(progressPercentage, player, currentRanges, rangePercentChosenDisplay, totalRange, comboCellsPlayers) {
    let comboCells
    let displayRange
    if (player === 'player1') {
        comboCells = comboCellsPlayers[0]
        displayRange = rangePercentChosenDisplay[0]
        currentRanges.player1 = []
    } else if (player === 'player2') {
        comboCells = comboCellsPlayers[1]
        displayRange = rangePercentChosenDisplay[1]
        currentRanges.player2 = []
    }
    for (const cell of comboCells) {
        const ranking = JSON.parse(cell.dataset.rangeRanking)
        if (progressPercentage >= ranking) cell.classList.add('highlight-button')
        if (progressPercentage < ranking) cell.classList.remove('highlight-button')
    }
    displayRange.innerText = ''
    displayRange.innerText = progressPercentage.toFixed(2) + '%'
    if (player === 'player1') currentRanges.player1 = totalRange.filter(combo => combo.rangeRanking <= progressPercentage)
    else if (player === 'player2') currentRanges.player2 = totalRange.filter(combo => combo.rangeRanking <= progressPercentage)
}

function isEqualCombo(combo1, combo2) {
    return JSON.stringify(combo1) === JSON.stringify(combo2);
}

export { updateRangeCell, updateRangeCategory, updateRangeBar }