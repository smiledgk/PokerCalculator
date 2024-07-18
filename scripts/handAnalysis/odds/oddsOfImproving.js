import { checkStreet, checkPlayerCards } from '../../checkingFunctions/checkCards.js'
import { updateComboArray } from '../../checkingFunctions/updateComboArray.js'
import { fillEVText } from '../../EVFunctions/playersEV.js'
import { displayBestCards } from '../bestCards/displayBestCards.js'
import { displayOuts } from '../outs/displayOuts.js'
import { allPlayerCards, assigningKnownCards } from '../../assigningCardsFunctions/assigningPlayerCards.js'
import { determineCombo } from '../../checkCombosFunctions/checkWin.js'
import { pokerCombinations } from '../../fillingfunctions/helperVariables.js'
import { currentStreet } from '../../simulationFunctions/runSimulation.js'
import { drawChart } from '../../editMode/represent.js'
const players = ['firstPlayer', 'secondPlayer']



async function oddsOfImproving(cards, player, times, playerHandsDOM, EVDom) {
  const comboArray = await calculateOddsOfImproving(cards, player, times)
  if (firstPlayerEVText.innerText === '---' && secondPlayerEVText.innerText === '---' && checkStreet(cards) !== 'Preflop') fillEVText(times, cards, playerHandsDOM, EVDom);
  if (currentStreet !== checkStreet(cards) && checkStreet(cards) !== 'Preflop') {
    fillEVText(times, cards, playerHandsDOM, EVDom);
  }
  if (checkStreet(cards) !== 'Preflop' || checkStreet(cards) !== 'River') {
    await drawChart(comboArray)
    displayOuts(player, cards)
    displayBestCards(player, cards)
  }
}

function calculateOddsOfImproving(cards, player, times) {
  
  let street = ''
  checkPlayerCards(cards)
  if (!checkStreet(cards)) alert('Cards are not inserted correctly!')
  else {
    street = checkStreet(cards)
  }
  const playerCards = allPlayerCards(cards, player, assigningKnownCards(street, cards))
  console.log(playerCards)
  const otherPlayerHoleCards = allPlayerCards(cards, players.find(neededPlayer => neededPlayer !== player), assigningKnownCards(street, cards)).slice(0, 2)
  let board = []
  if (playerCards.length > 2) board = playerCards.slice(2)
  if (board.length === 5) return determineCombo(playerCards)
  const combinationsArray = pokerCombinations.map(combo => {
    combo.count = 0;
    return combo
  })
  for (let i = 0; i < times; i++) {
    updateComboArray(street, playerCards, otherPlayerHoleCards, combinationsArray)
  }

  combinationsArray.map(combo => {
    const odds = `${(combo.count * 100 / times).toFixed(3)}%`
    combo.odds = odds
  })
  //console.log(combinationsArray)
  return combinationsArray;
}

export { oddsOfImproving, players }