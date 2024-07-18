import { checkStreet, checkPlayerCards } from '../checkingFunctions/checkCards.js'
import { yourCurrentHand } from '../checkingFunctions/yourCurrentHand.js'
import { runSim } from '../simulationFunctions/runSimulation.js'
import { allPlayerCards, assigningKnownCards } from '../assigningCardsFunctions/assigningPlayerCards.js'

async function fillEVText(times, cards, playerHandsDOM, EVDom) {
  const EVObject = await getPlayersEV(times, cards)
  const { firstPlayerCurrentHand, secondPlayerCurrentHand } = playerHandsDOM
  const { firstPlayerEVText, secondPlayerEVText, drawEVText } = EVDom
  if (checkStreet(cards) !== 'Preflop') {
    firstPlayerCurrentHand.innerText = yourCurrentHand('firstPlayer', cards).combo
    secondPlayerCurrentHand.innerText = yourCurrentHand('secondPlayer', cards).combo
  }
  firstPlayerEVText.innerText = `${EVObject.firstPlayerEV.toFixed(2)} %`
  secondPlayerEVText.innerText = `${EVObject.secondPlayerEV.toFixed(2)} %`
  drawEVText.innerText = `${EVObject.drawPercent.toFixed(2)} %`
  if (EVObject.firstPlayerEV > EVObject.secondPlayerEV) {
    firstPlayerEVText.style.color = 'green'
    secondPlayerEVText.style.color = 'red'
    if (checkStreet(cards) !== 'Preflop') {
      firstPlayerCurrentHand.style.color = 'green'
      secondPlayerCurrentHand.style.color = 'red'
    }
  } else if (EVObject.firstPlayerEV < EVObject.secondPlayerEV) {
    firstPlayerEVText.style.color = 'red'
    secondPlayerEVText.style.color = 'green'
    if (checkStreet(cards) !== 'Preflop') {
      firstPlayerCurrentHand.style.color = 'red'
      secondPlayerCurrentHand.style.color = 'green'
    }
  } else drawEVText.style.color = 'green'
}

async function getPlayersEV(times, cards) {
  let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
  let street = ''
  checkPlayerCards(cards)
  if (!checkStreet(cards)) alert('Cards are not inserted correctly!')
  else {
    street = checkStreet(cards)
  }
  const cards1 = allPlayerCards(cards, 'firstPlayer', assigningKnownCards(street, cards))
  const cards2 = allPlayerCards(cards, 'secondPlayer', assigningKnownCards(street, cards))
  count = await runSim(count, times, cards1, cards2, street)
  const firstPlayerEV = count.firstPlayerWins * 100 / times
  const secondPlayerEV = count.secondPlayerWins * 100 / times
  const drawPercent = count.draws * 100 / times
  return { firstPlayerEV, secondPlayerEV, drawPercent }
}

export { fillEVText }
