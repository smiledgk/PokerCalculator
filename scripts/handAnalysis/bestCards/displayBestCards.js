import { highlightCards } from "../../editMode/represent.js"
import { gettingRemainingCards } from "../../assigningCardsFunctions/gettingRemainingCards.js"
import { checkStreet } from "../../checkingFunctions/checkCards.js"
import { allPlayerCards, assigningKnownCards } from "../../assigningCardsFunctions/assigningPlayerCards.js"
import { getAllCombos } from "../getAllCombos.js"
import { players } from "../odds/oddsOfImproving.js"
import { runSim } from "../../simulationFunctions/runSimulation.js"
import { determineCombo } from "../../checkCombosFunctions/checkWin.js"

const bestCardsList = document.querySelector('#bestCardsList')

async function displayBestCards(player, cards) {
        highlightCards(player)
        const cardCombos = await findBestCards(player, cards)
        if (bestCardsList) bestCardsList.innerHTML = ''
        const title = document.createElement('h4')
        title.innerText = `For Better Combo - ${cardCombos.length}`
        title.style.textAlign = 'center'
        bestCardsList.appendChild(title)
        for (let cardCombo of cardCombos) {
            const li = document.createElement('li')
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
            const img = document.createElement('img')
            img.setAttribute('src', `Files/Cards/${cardCombo.nextCard.rank.toLowerCase()}_of_${cardCombo.nextCard.suit.toLowerCase()}.png`)
            img.setAttribute('width', '60px')
            img.classList.add('outs')
            li.appendChild(img)
            let color
            const EVValue = cardCombo.EV
            const alpha = Math.min(EVValue / 100 + 0.1, 1)
            if (EVValue < 50) {
                const alphaRed = 1 - alpha;
                color = `rgba(255, 0, 0, ${alphaRed})`;
            } else if (EVValue === 50) {
                color = '#ADD8E6';
            } else {
                color = `rgba(144, 238, 144, ${alpha})`;
            }
            const comboBadge = document.createElement('badge')
            comboBadge.style.background = color
            comboBadge.innerText = cardCombo.combo.combo
            li.appendChild(comboBadge)
            const EVBadge = document.createElement('badge')
            EVBadge.style.background = color
            EVBadge.innerText = `${cardCombo.EV} %`;
            li.appendChild(EVBadge)
            bestCardsList.appendChild(li)
        }
    }


function findBestCards(player, cards) {
    const remainingCards = gettingRemainingCards(cards)
    const street = checkStreet(cards)
    const playerCards = allPlayerCards(cards, player, assigningKnownCards(street, cards))
    const presentComboStrength = determineCombo(playerCards).strength
    const cardsCombos = getAllCombos(cards, player, remainingCards)
    const betterCardsCombos = cardsCombos.filter(c => c.combo.strength > presentComboStrength)
    const nextStreet = (street === 'Flop') ? 'Turn' : (street === 'Turn' ? 'River' : 'UnknownStreet');
    betterCardsCombos.map(combo => {
        const playerCardsAdj = allPlayerCards(cards, player, assigningKnownCards(street, cards))
        const otherPlayerCards = allPlayerCards(cards, players.find(neededPlayer => neededPlayer !== player), assigningKnownCards(street, cards))
        playerCardsAdj.push(combo.nextCard)
        otherPlayerCards.push(combo.nextCard)
        let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
        const simulations = 5000
        const result = runSim(count, simulations, playerCardsAdj, otherPlayerCards, nextStreet)
        if (player === 'firstPlayer') combo.EV = (result.firstPlayerWins + result.draws / 2) * 100 / simulations
        else if (player === 'secondPlayer') combo.EV = (result.firstPlayerWins + result.draws / 2) * 100 / simulations
    })
    const sortedCombos = betterCardsCombos.sort((a, b) => b.EV - a.EV);
    return sortedCombos
}

export { displayBestCards }