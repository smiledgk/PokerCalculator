const rangeTables = document.querySelectorAll('.rangeTables')
let totalRange = []
let player1 = []
let player2 = []
let currentRanges = { player1, player2 }
const actionBtn = document.querySelector('#btnRangeCalc')
import { fillTheTable } from "./scripts/rangeTableFunctions/createRangeTable.js";
import { chosenUserCombinations } from "./scripts/rangeTableFunctions/userCombos.js";
import { calculateRangeVsRangeEquity } from "./scripts/rangeTableFunctions/calculateRangeEquity.js";
import { displayEV } from "./scripts/rangeTableFunctions/displayHandsEV.js";
import { updateRangeCategory, updateRangeBar } from "./scripts/rangeTableFunctions/updateChosenRange.js";
import { displayCombos } from "./scripts/rangeTableFunctions/displayCombosRange.js";
import { filterRange, readCommunityCards } from "./scripts/rangeTableFunctions/completeCardsRanges.js"

rangeTables.forEach(table => {
    const player = table.id.replace('range-', '')
    const tableBody = fillTheTable(player, totalRange, currentRanges)
    table.appendChild(tableBody)
})

const comboCellsPlayers = [document.querySelectorAll('.comboCell#player1'), document.querySelectorAll('.comboCell#player2')]
const rangePercentChosenDisplay = document.querySelectorAll('.rangePercentChosen')
const draggablePoints = document.querySelectorAll('.draggable')
const rangeButtons = document.querySelectorAll('.rangeButtons')

actionBtn.addEventListener('click', async function () {
    const communityCards = readCommunityCards()
    const combinations1 = filterRange(chosenUserCombinations(currentRanges.player1), communityCards)
    const combinations2 = filterRange(chosenUserCombinations(currentRanges.player2), communityCards)
    const result = await calculateRangeVsRangeEquity(combinations1, combinations2, 100000)
    displayEV(result)
})

rangeButtons.forEach(button => {
    button.addEventListener('click', function () {
        const lastIndex = button.id.lastIndexOf("-");
        const player = button.id.slice(lastIndex + 1);
        const category = button.id.slice(0, lastIndex);
        const updatedRange = updateRangeCategory(player, category, comboCellsPlayers, totalRange)
        if (player === 'player1') currentRanges.player1 = updatedRange
        else if (player === 'player2') currentRanges.player2 = updatedRange
        console.log(currentRanges)
        displayCombos(player, currentRanges)
    })
})
for (let point of draggablePoints) {
    const player = (point.classList.contains('player1')) ? 'player1' : 'player2'
    $(document).ready(function () {
        $(`#draggable-point-${player}`).draggable({
            axis: 'x',
            containment: `#audio-progress-${player}`,
            drag: function (event, ui) {
                const progressPercentage = (ui.position.left / $(this).parent().width()) * 100;
                updateRangeBar(progressPercentage, player, currentRanges, rangePercentChosenDisplay, totalRange, comboCellsPlayers)
                displayCombos(player, currentRanges)
                $(`#audio-progress-bar-${player}`).width(progressPercentage + '%');
            }
        });
    });
}

export { currentRanges }
/*function getRange(combinations) {
    if (combinations === undefined) {
        return [].concat(...range)
    }
    const index = range.findIndex(combo => isEqualCombo(combo, combinations));
    if (index !== -1) {
        range.splice(index, 1);
    } else {
        range.push(combinations);
    }
    const allCombos = [].concat(...range);
    return allCombos;
}*/

/*function getAllCombos() {
    let combinations = []
    cardsCombosTable.forEach(row => {
        row.forEach(combo => {
            combinations.push({
                combo: combo.combinations,
                markup: combo.markup
            })
        })
    })
    const markups = combinations.map(combo => combo.markup)
    const modifiedCombinations = combinations.map(total => {
        const { combo, markup } = total;
        const arrayOfObjects = combo.map(comboItem => {
            return {
                cards: comboItem,
                markup: markup
            };
        });
        return [...arrayOfObjects];
    });
    const allCards = modifiedCombinations.flat();
    return [allCards, markups];
}

getAllCombos()*/


