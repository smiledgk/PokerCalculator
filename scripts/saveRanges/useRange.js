const rangePercent = document.querySelectorAll('.rangePercentChosen')
import { displayCombos } from "../rangeTableFunctions/displayCombosRange.js"
import { currentRanges } from "../../pokerTable.js"

function useRange(range, player) {
    if (player === 'player1') currentRanges.player1 = range.range
    else if (player === 'player2') currentRanges.player2 = range.range
    let comboCells

    if (player === 'player1') {
        comboCells = document.querySelectorAll(`.comboCell#${player}`)
        
    }

    else if (player === 'player2') {
        comboCells = document.querySelectorAll(`.comboCell#${player}`)
    }
    
    comboCells.forEach(cell => {
        cell.classList.remove('highlight-button')
    })
    displayCombos(player, currentRanges)
    const combinations = range.range
    const numberOfCombos = combinations.reduce((accumulator, currentValue) => accumulator + currentValue.numberOfCombos, 0);
    const percentOfChosenCombos = numberOfCombos * 100 / 1326
    rangePercent.innerText = ''
    if (player === 'player1') rangePercent[0].innerText = percentOfChosenCombos.toFixed(2) + '%'
    else if (player === 'player2') rangePercent[1].innerText = percentOfChosenCombos.toFixed(2) + '%'
    
    showRangeTable(range, player)
}

function showRangeTable(rangeObj, player) {
    const range = rangeObj.range
    let comboCells
    if (player === 'player1') {
        comboCells = document.querySelectorAll(`.comboCell#${player}`)
        currentRanges.player1 = range
    }

    else if (player === 'player2') {
        comboCells = document.querySelectorAll(`.comboCell#${player}`)
        currentRanges.player2 = range
    }
    for (const cell of comboCells) {
        const combo = JSON.parse(cell.dataset.combo);
        if (isIncluded(combo, range)) {
            cell.classList.add('highlight-button');
        } else {
            cell.classList.remove('highlight-button');
        }
    }
}

function isIncluded(obj, array) {
    return array.some(item => JSON.stringify(item) === JSON.stringify(obj));
}

export { useRange }