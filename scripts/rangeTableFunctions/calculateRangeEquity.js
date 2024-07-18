import { getRemainingCards, readCommunityCards } from "./completeCardsRanges.js"
import { runSimRanges } from "./simulationRange.js"
const loadingBar = document.getElementById('loadingBar');

async function calculateRangeVsRangeEquity(firstRange, secondRange, times) {
    const firstRangeRuns = Math.ceil(times / (firstRange.length))
    loadingBar.style.visibility = 'visible';
    let winEV = 0
    let drawEV = 0
    let completedExecutions = 0;
    const progressInterval = 500;
    for (let combo1 of firstRange) {
        const hand1 = combo1.cards
        const deadCards = [...hand1]
        const filteredSecondRange = secondRange.filter(obj => {
            // Check if the card is present in chosenCards
            return !deadCards.some(deadCard =>
                obj.cards.some(card =>
                    deadCard.rank === card.rank && deadCard.suit === card.suit
                )
            );
        });
        let winEVsum = 0
        let drawEVsum = 0
        for (let combo2 of filteredSecondRange) {
            const runs = Math.ceil(firstRangeRuns / (filteredSecondRange.length))
            const hand2 = combo2.cards
            const result = await calculateEquity(combo1, hand1, hand2, runs)
            const winEVrun = result.winEV
            winEVsum += winEVrun
            const drawEVrun = result.drawEV
            drawEVsum += drawEVrun
            completedExecutions++;
            if (completedExecutions % progressInterval === 0) {
                const progress = (completedExecutions / (firstRange.length * filteredSecondRange.length)) * 100;
                loadingBar.style.width = progress + '%';
                await new Promise(resolve => setTimeout(resolve, 0)); // Introduce a small delay to allow DOM update
            }
        }
        const totalwinEV = winEVsum / filteredSecondRange.length
        const totaldrawEV = drawEVsum / filteredSecondRange.length
        winEV += totalwinEV
        drawEV += totaldrawEV
    }
    loadingBar.style.width = '0%';
    loadingBar.style.visibility = 'hidden';
    const result = {
        win: winEV / firstRange.length,
        draw: drawEV / firstRange.length,
    }
    return result
}

async function calculateEquity(combo1, hand1, hand2, runs) {
    const deadCards = await getRemainingCards(hand1, hand2)
    let count = runSimRanges(hand1, hand2, deadCards, runs)
    return {
        cards: combo1.cards,
        markup: combo1.markup,
        winEV: count.firstEV * 100,
        drawEV: count.drawEV * 100,
        loseEV: count.secondEV * 100,
    }
}

export { calculateRangeVsRangeEquity }