import { randomizeCard } from '../randomCards/randomizeCard.js'
import { checkWin } from '../checkCombosFunctions/checkWin.js'
let currentStreet
function runSim(count, times, cards1, cards2, street) {
    let currentCount = { ...count }
    for (let i = 0; i < times; i++) {
        const result = runSimOnce(cards1, cards2, street)
        currentCount.firstPlayerWins += result.firstPlayerWins;
        currentCount.secondPlayerWins += result.secondPlayerWins;
        currentCount.draws += result.draws;
    }
    return currentCount
}

function runSimOnce(cards1, cards2, street) {
    const firstCards = [...cards1]
    const secondCards = [...cards2]
    const deadCards = firstCards.concat(secondCards)
    if (street === 'Preflop') {
        const flop1 = randomizeCard(deadCards)
        deadCards.push(flop1)
        const flop2 = randomizeCard(deadCards)
        deadCards.push(flop2)
        const flop3 = randomizeCard(deadCards)
        deadCards.push(flop3)
        const turn = randomizeCard(deadCards)
        deadCards.push(turn)
        const river = randomizeCard(deadCards)
        firstCards.push(flop1, flop2, flop3, turn, river)
        secondCards.push(flop1, flop2, flop3, turn, river)
    }
    else if (street === 'Flop') {
        const turn = randomizeCard(deadCards)
        deadCards.push(turn)
        const river = randomizeCard(deadCards)
        firstCards.push(turn, river)
        secondCards.push(turn, river)
    }
    else if (street === 'Turn') {
        const river = randomizeCard(deadCards)
        firstCards.push(river)
        secondCards.push(river)
    }
    const calculatedCount = checkWin(firstCards, secondCards)
    currentStreet = street
    return calculatedCount
}

export { runSim, currentStreet }