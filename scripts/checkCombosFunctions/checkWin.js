import { FullHouseQuads, Flush, Straight, ThreeOfAKind, TwoPair, Pair, HighCard } from './checkHandStrength.js'
import { StraightFlushWinnerCheck, QuadsWinnerCheck, FullHouseWinnerCheck, FlushWinnerCheck, StraightWinnerCheck, ThreeOfAKindWinnerCheck, TwoPairWinnerCheck, OnePairWinnerCheck, HighCardWinnerCheck } from './equalHandsWinnerCheck.js'
import { pokerCombinations, rankValues } from '../fillingfunctions/helperVariables.js'

function checkWin(cards1, cards2) {
  let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
  const firstPlayerCombo = determineCombo(cards1)
  const secondPlayerCombo = determineCombo(cards2)
  if (firstPlayerCombo.strength > secondPlayerCombo.strength) {
    //console.log('First player won!')
    count.firstPlayerWins = count.firstPlayerWins + 1
  } else if (firstPlayerCombo.strength < secondPlayerCombo.strength) {
    //console.log('Second player won!')
    count.secondPlayerWins = count.secondPlayerWins + 1
  } else {
    const drawCount = equalComboStrengthCheck(firstPlayerCombo.strength, firstPlayerCombo, secondPlayerCombo)
    count.firstPlayerWins += drawCount.firstPlayerWins;
    count.secondPlayerWins += drawCount.secondPlayerWins;
    count.draws += drawCount.draws;
  }
  return count
}

function equalComboStrengthCheck(comboStrength, firstPlayerCombo, secondPlayerCombo) {
  const combo = pokerCombinations.find(combo => combo.strength === comboStrength).name
  switch (combo) {
    case "High Card":
      return HighCardWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "One Pair":
      return OnePairWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Two Pair":
      return TwoPairWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Three Of A Kind":
      return ThreeOfAKindWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Straight":
      return StraightWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Flush":
      return FlushWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Full House":
      return FullHouseWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Quads":
      return QuadsWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Straight Flush":
      return StraightFlushWinnerCheck(firstPlayerCombo, secondPlayerCombo);
    case "Royal Flush":
      return { firstPlayerWins: 0, secondPlayerWins: 0, draws: 1 }
  }
}

function determineCombo(cards) {
  let combo = null;
  if (cards.length >= 5) {
    combo = Flush(cards);
    if (combo) return combo;

    const sortedCards = cards.sort((a, b) => rankValues[b.rank] - rankValues[a.rank]);
    combo = Straight(sortedCards);
    if (combo) return combo;

    const repetitions = separateRepetitions(sortedCards).sort((a, b) => rankValues[b[0].rank] - rankValues[a[0].rank]).sort((a, b) => b.length - a.length)
    combo = FullHouseQuads(sortedCards, repetitions);
    if (combo) return combo;

    combo = ThreeOfAKind(sortedCards, repetitions);
    if (combo) return combo;

    combo = TwoPair(sortedCards, repetitions);
    if (combo) return combo;

    combo = Pair(sortedCards, repetitions);
    if (combo) return combo;

    return HighCard(cards)

  } else {
    alert(`Please Complete all the Cards`);
  }
}

function separateRepetitions(cards) {
  const duplicates = {};
  for (const card of cards) {
    const rank = card.rank
    if (duplicates[rank]) {
      duplicates[rank].push(card);
    } else {
      duplicates[rank] = [card];
    }
  }
  // Filter out arrays with only one element (non-duplicates)
  const duplicateArrays = Object.values(duplicates).filter(array => array.length > 1).sort((a, b) => b.length - a.length);
  return duplicateArrays
}

export { checkWin, equalComboStrengthCheck, determineCombo };