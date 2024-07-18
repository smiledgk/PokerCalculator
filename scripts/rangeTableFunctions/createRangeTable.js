import { cardsCombosTable } from "../fillingfunctions/helperVariables.js"
import { updateRangeCell } from "./updateChosenRange.js"
import { displayCombos } from "./displayCombosRange.js"



function fillTheTable(player, totalRange, currentRanges) {
    const tableBody = document.createElement('tbody')
    cardsCombosTable.forEach(row => {
        const tr = document.createElement('tr')
        row.forEach(combo => {
            if (player === 'player1') totalRange.push(combo) //set an array of combos
            //create a cell
            const td = document.createElement('td')
            td.style.width = '1em'
            td.style.height = '5vh'
            td.style.padding = '0';
            //fill cell with a button
            const button = document.createElement('button')
            setCellParametersTable(button, player, combo)
            // add event listener
            button.addEventListener('click', function () {
                let currentRange
                if (player === 'player1') currentRange = currentRanges.player1
                if (player === 'player2') currentRange = currentRanges.player2
                if (this.classList.contains('highlight-button')) {
                    let indexToRemove = currentRange.findIndex(combo1 => combo1 === combo);
                    if (indexToRemove !== -1) {
                        currentRange.splice(indexToRemove, 1);
                    }
                } else {
                    updateRangeCell(combo.markup, currentRange, player, currentRanges, totalRange)
                }
                displayCombos(player, currentRanges)
                changeCellStyle(this)
            })
            //set color for a cell
            assignComboColor(button, combo.type)
            td.appendChild(button)
            tr.appendChild(td)
        })
        tableBody.appendChild(tr)
    })
    return tableBody
}

function setCellParametersTable(button, player, combo) {
    button.style.border = '0.1rem'
    button.style.borderRadius = '0.1rem'
    button.classList.add('btn-block')
    button.id = player
    button.textContent = combo.markup
    button.classList.add('comboCell')
    button.dataset.combo = JSON.stringify(combo)
    button.dataset.combinations = JSON.stringify(combo.combinations)
    button.dataset.comboMarkups = JSON.stringify(combo.comboMarkups)
    button.dataset.EV = JSON.stringify(combo.EV)
    button.dataset.rank = JSON.stringify(combo.rank)
    button.dataset.numberOfCombos = JSON.stringify(combo.numberOfCombos)
    button.dataset.category = JSON.stringify(combo.category)
    button.dataset.rangeRanking = JSON.stringify(combo.rangeRanking)
}

function assignComboColor(button, type) {
    switch (type) {
        case 'pair':
            button.style.backgroundColor = 'lightblue'; // Set color for pair
            break;
        case 'suited':
            button.style.backgroundColor = 'lightgreen'; // Set color for suited
            break;
        case 'off-suited':
            button.style.backgroundColor = 'lightcoral'; // Set color for off-suited
            break;
        default:
            // Default color if hand type is not recognized
            button.style.backgroundColor = 'gray';
            break;
    }
}

function changeCellStyle(button) {
    button.classList.toggle('highlight-button');
}

export { fillTheTable }