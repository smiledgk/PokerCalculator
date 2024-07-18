import { randomizeCard } from "../randomCards/randomizeCard.js"
import { determineCombo } from "../checkCombosFunctions/checkWin.js"

function updateComboArray(street, cards, otherPlayerHoleCards, combinationsArray) {
    const updatedCards = [...cards]
    if (street == 'Preflop') {
        const deadCards = [...updatedCards]
        if (otherPlayerHoleCards) deadCards.concat(otherPlayerHoleCards)
        //logic for removing 2nd player dead cards
        const flop1 = randomizeCard(deadCards)
        deadCards.push(flop1)
        const flop2 = randomizeCard(deadCards)
        deadCards.push(flop2)
        const flop3 = randomizeCard(deadCards)
        deadCards.push(flop3)
        const turn = randomizeCard(deadCards)
        deadCards.push(turn)
        const river = randomizeCard(deadCards)
        updatedCards.push(flop1, flop2, flop3, turn, river)
    } else if (street == 'Flop') {
        //logic for removing 2nd player dead cards
        const deadCards = [...updatedCards]
        if (otherPlayerHoleCards) deadCards.concat(otherPlayerHoleCards)
        const turn = randomizeCard(deadCards)
        deadCards.push(turn)
        const river = randomizeCard(deadCards)
        updatedCards.push(turn, river)
    } else if (street == 'Turn') {
        const deadCards = [...updatedCards]
        if (otherPlayerHoleCards) deadCards.concat(otherPlayerHoleCards)
        const river = randomizeCard(deadCards)
        updatedCards.push(river)
    }
    const resultCombo = determineCombo(updatedCards)
    const foundCombo = combinationsArray.find(item => item.strength === resultCombo.strength);
    if (foundCombo) {
        foundCombo.count += 1;
    }
}

export { updateComboArray }