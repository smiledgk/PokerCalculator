import { checkStreet } from "../../checkingFunctions/checkCards.js"
import { allPlayerCards, assigningKnownCards } from "../../assigningCardsFunctions/assigningPlayerCards.js"
import { checkWin } from "../../checkCombosFunctions/checkWin.js"
import { getAllCombos } from "../getAllCombos.js"
import { players } from "../odds/oddsOfImproving.js"
import { gettingRemainingCards } from "../../assigningCardsFunctions/gettingRemainingCards.js"
import { equalComboStrengthCheck } from "../../checkCombosFunctions/checkWin.js"
import { rankValues } from "../../fillingfunctions/helperVariables.js"

const outsList = document.querySelector('#outsList')

function displayOuts(player, cards) {
  // can be merged with previous
  if (outsList) outsList.innerHTML = ''
  if (findOuts(player, cards)) {
    const outCombos = findOuts(player, cards)
    const title = document.createElement('h4')
    title.innerText = `${outCombos.length} Outs`
    title.style.textAlign = 'center'
    outsList.appendChild(title)
    for (let cardCombo of outCombos) {
      const li = document.createElement('li')
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
      const img = document.createElement('img')
      img.setAttribute('src', `Files/Cards/${cardCombo.nextCard.rank.toLowerCase()}_of_${cardCombo.nextCard.suit.toLowerCase()}.png`)
      img.setAttribute('width', '60px')
      img.classList.add('outs')
      li.appendChild(img)
      const badge = document.createElement('span')
      badge.classList.add('badge', 'bg-light', 'justify-content-between', 'text-bg-light',)
      badge.innerText = cardCombo.combo.combo
      li.appendChild(badge)
      outsList.appendChild(li)
    }
  }
}

function findOuts(player, cards) {
  const street = checkStreet(cards)
  const playerCards = allPlayerCards(cards, player, assigningKnownCards(street, cards))
  const otherPlayerCards = allPlayerCards(cards, players.find(neededPlayer => neededPlayer !== player), assigningKnownCards(street, cards))
  const score = checkWin(playerCards, otherPlayerCards)
  if (score.firstPlayerWins > score.secondPlayerWins && player == 'firstPlayer') return false
  if (score.firstPlayerWins > score.secondPlayerWins && player == 'secondPlayer') return false
  //until now correct
  const newCards = gettingRemainingCards(cards)
  const cardsCombosFirst = getAllCombos(cards, 'firstPlayer', newCards)
  const cardsCombosSecond = getAllCombos(cards, 'secondPlayer', newCards)
  const cardsToFilter = (player === 'firstPlayer') ? cardsCombosFirst : cardsCombosSecond
  let cardsToCompareWith = (player === 'firstPlayer') ? cardsCombosSecond : cardsCombosFirst
  const possibleOuts = cardsToFilter.filter(cardCombo => {
    return !cardsToCompareWith.some(compareCombo => (
      compareCombo.nextCard.rank === cardCombo.nextCard.rank &&
      compareCombo.nextCard.suit === cardCombo.nextCard.suit
    ));
  })
  cardsToCompareWith = cardsToCompareWith.concat(possibleOuts)
  const betterOrEqualCombos = cardsToFilter.filter((cardCombo) => {
    const cardComboCompare = cardsToCompareWith.find(cardComboCompare => cardCombo.nextCard == cardComboCompare.nextCard)
    if (cardComboCompare) {
      if (cardCombo.combo.strength > cardComboCompare.combo.strength) return cardCombo
      else if (cardCombo.combo.strength == cardComboCompare.combo.strength) {
        const score1 = equalComboStrengthCheck(cardCombo.combo.strength, cardCombo.combo, cardComboCompare.combo)
        if (score1.firstPlayerWins > score1.secondPlayerWins && player == 'firstPlayer') return cardCombo
        if (score1.firstPlayerWins > score1.firstPlayerWins && player == 'secondPlayer') return cardCombo
      }
    }
  })
  const sortedCombos = betterOrEqualCombos.sort((a, b) => {
    if (b.combo.strength !== a.combo.strength) {
      return b.combo.strength - a.combo.strength;
    }
    return rankValues[b.nextCard.rank] - rankValues[a.nextCard.rank];
  });
  return sortedCombos
}

export { displayOuts }