import { checkWin } from "../checkCombosFunctions/checkWin.js"
import { getCommunityCards } from "./completeCardsRanges.js"

function runSimRanges(hand1, hand2, deadCards, times) {
    let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
    for (let i = 0; i < times; i++) {
        const communityCards = getCommunityCards(deadCards)
        const cards1 = hand1.concat(communityCards)
        const cards2 = hand2.concat(communityCards)
        const result = checkWin(cards1, cards2)
        count.firstPlayerWins += result.firstPlayerWins;
        count.secondPlayerWins += result.secondPlayerWins;
        count.draws += result.draws;
    }
    return {
        firstEV: count.firstPlayerWins / times,
        secondEV: count.secondPlayerWins / times,
        drawEV: count.draws / times
    };
}

export { runSimRanges }