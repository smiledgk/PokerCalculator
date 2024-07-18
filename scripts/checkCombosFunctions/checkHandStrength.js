import { rankValues } from '../fillingfunctions/helperVariables.js'

const RoyalFlush = (cards) => {
  const royalRanks = ['10', 'Jack', 'Queen', 'King', 'Ace'];
  // Group cards by suit
  const suitGroups = {};
  cards.forEach(card => {
    const suit = card.suit;
    if (!suitGroups[suit]) {
      suitGroups[suit] = [];
    }
    suitGroups[suit].push(card.rank);
  })
  for (const suit in suitGroups) {
    const sortedRanks = suitGroups[suit].sort((a, b) => royalRanks.indexOf(a) - royalRanks.indexOf(b));
    if (JSON.stringify(sortedRanks) === JSON.stringify(royalRanks)) {
      return { combo: 'Royal Flush', strength: 9 }; // Found a Royal Flush in this suit
    }
  }
  return false
}

const StraightFlush = (cards) => {
  const mostOccurringSuit = cards.reduce((acc, card) => {
    const currentSuitCount = (acc[card.suit] || 0) + 1;
    return currentSuitCount > acc.mostOccurringCount
      ? { mostOccurringSuit: card.suit, mostOccurringCount: currentSuitCount }
      : acc;
  }, { mostOccurringSuit: null, mostOccurringCount: 0 }).mostOccurringSuit;
  const straightFlushCandidate = cards.filter(card => card.suit == mostOccurringSuit).sort((a, b) => rankValues[b.rank] - rankValues[a.rank]);

  if (Straight(straightFlushCandidate)) {
    let combo = null;
    combo = RoyalFlush(cards)
    if (combo) return combo;
    else return { combo: 'Straight Flush', highest: Straight(straightFlushCandidate).highest, strength: 8 }
  }
  else return false;
}

export const FullHouseQuads = (sortedCards, repetitions) => {
  if (repetitions.length == 0) return false
  if (repetitions[0].length === 4) {
    const kicker = sortedCards.filter(card => card.rank !== repetitions[0][0].rank)[0]
    const combo = sortedCards.filter(card => card.rank == repetitions[0][0].rank)
    combo.push(sortedCards.filter(card => card == kicker)[0])
    return { combo: 'Quads', quads: combo[0].rank, highest: transformRank(combo[4].rank), strength: 7 }
  } else if (repetitions && repetitions.length > 1) {
    if (repetitions[0].length === 3) {
       if ((repetitions[1].length >= 2)) {
        const unsortedCombo = sortedCards.filter(card => card.rank == repetitions[0][0].rank || card.rank == repetitions[1][0].rank)
        const combo = sortCombo(unsortedCombo).slice(0, 5)
        return { combo: 'Full House', full: transformRank(combo[0].rank), of: transformRank(combo[3].rank), strength: 6 }
      } else return false
    } else return false
  } else return false
}

export const Flush = (cards) => {
  const suitCounts = cards.reduce((acc, card) => {
    acc[card.suit] = (acc[card.suit] || 0) + 1;
    return acc;
  }, {});
  const mostOccurringSuit = Object.keys(suitCounts).reduce((prev, current) => (suitCounts[current] > suitCounts[prev] ? current : prev), Object.keys(suitCounts)[0]);
  const amountofSameSuit = suitCounts[mostOccurringSuit];
  if (amountofSameSuit >= 5) {
    let combo = null
    combo = StraightFlush(cards)
    if (combo) {
      return combo;
    }
    else {
      combo = cards.filter(card => card.suit == mostOccurringSuit).sort((a, b) => rankValues[b.rank] - rankValues[a.rank]).slice(0, 5)
      return { combo: 'Flush', highest: transformRank(combo[0].rank), highest1: transformRank(combo[1].rank), highest2: transformRank(combo[2].rank), highest3: transformRank(combo[3].rank), highest4: transformRank(combo[4].rank), strength: 5 }
    }
  } else return false
}


export const Straight = (sortedCards) => {
  const duplicateCheck = cardsWithoutDuplicates(sortedCards);
  const lowAceStraight = ['Ace', '2', '3', '4', '5'];
  if (duplicateCheck.length < 5) return false;
  else {
    for (let i = 0; i <= duplicateCheck.length - 5; i++) {
      const straightCandidate = duplicateCheck.slice(i, i + 5)
      const straightCandidateTransformed = straightCandidate.map(value => rankValues[value]);
      const average = straightCandidateTransformed.reduce((accumulator, current) => accumulator + current, 0) / straightCandidateTransformed.length;
      const difference = straightCandidateTransformed[0] - straightCandidateTransformed[4]
      if (average === straightCandidateTransformed[2] && difference === 4) {
        return { combo: 'Straight', highest: transformRank(straightCandidate[0]), strength: 4 }
      }
    }

    const filtered = duplicateCheck.map(value => rankValues[value]).filter(value => lowAceStraight.map(value => rankValues[value]).includes(value))
    if (filtered.length === 5) return { combo: 'Straight', highest: 5, strength: 4 }; // A2345 straight

    return false;
  }
  //update logic for A2345 straight
}

export const ThreeOfAKind = (sortedCards, repetitions) => {
  if (repetitions.length == 0) return false
  if (repetitions && repetitions.length === 1 && repetitions[0].length === 3) {
    const set = sortedCards.filter(card => card.rank == repetitions[0][0].rank)
    const kickers = sortedCards.filter(card => card.rank !== repetitions[0][0].rank).slice(0, 2)
    const combo = set.concat(kickers)
    return { combo: 'Three Of A Kind', set: transformRank(combo[0].rank), highest1: transformRank(combo[3].rank), highest2: transformRank(combo[4].rank), strength: 3 }
  } else return false
}

export const TwoPair = (sortedCards, repetitions) => {
  if (repetitions.length == 0) return false
  if (repetitions && repetitions.length > 1 && repetitions[0].length == 2 && repetitions[1].length == 2) {
    const twoPairs = sortedCards.filter(card => card.rank == repetitions[0][0].rank || card.rank == repetitions[1][0].rank)
    const kicker = sortedCards.map(card => {
      const spreadedRepetitions = [].concat(...repetitions)
      if (!spreadedRepetitions.includes(card)) return card
    }).filter(card => card != undefined)
    const combo = sortCombo(twoPairs.concat(kicker))
    const highestCard = (combo.length > 4) ? transformRank(combo[4].rank) : 2;
    return { combo: 'Two Pair', firstPair: transformRank(combo[0].rank), secondPair: transformRank(combo[2].rank), highest: highestCard, strength: 2 }
  } else return false
}

export const Pair = (sortedCards, repetitions) => {
  if (repetitions.length == 0) return false
  if (repetitions || repetitions.length == 1 || repetitions[0].length == 2) {
    const pair = sortedCards.filter(card => card.rank == repetitions[0][0].rank)
    const kicker = sortedCards.filter(card => card.rank !== repetitions[0][0].rank).slice(0, 3)
    const combo = pair.concat(kicker)
    return { combo: 'One Pair', pair: transformRank(combo[0].rank), highest1: transformRank(combo[2].rank), highest2: transformRank(combo[3].rank), highest3: transformRank(combo[4].rank), strength: 1 }
  } else return false
}

export const HighCard = (cards) => {
  const cards1 = cards.map(card => card.rank)
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i] === cards[j]) {
        return false; 
      }
    }
  }
  const combo = cards1.sort((a, b) => rankValues[b] - rankValues[a]).slice(0, 5);
  return { combo: 'High Card', highest: transformRank(combo[0]), highest1: transformRank(combo[1]), highest2: transformRank(combo[2]), highest3: transformRank(combo[3]), highest4: transformRank(combo[4]), strength: 0 }
}



function sortCombo(combo) {
  const rankCounts = combo.reduce((counts, card) => {
    const rank = card.rank;
    counts[rank] = (counts[rank] || 0) + 1;
    return counts;
  }, {});
  const sortedCombo = combo.sort((a, b) => rankCounts[b.rank] - rankCounts[a.rank]);
  return sortedCombo
}


function cardsWithoutDuplicates(cards) {
  const seenRanks = new Set();
  const uniqueCards = [];

  for (const card of cards) {
    const rank = card.rank;

    if (!seenRanks.has(rank)) {
      uniqueCards.push(rank);
      seenRanks.add(rank);
    }
  }
  return uniqueCards;
}

function transformRank(rank) {
  return rankValues[rank]
}

//module.exports = {RoyalFlush, StraightFlush, Quads, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, Pair, HighCard}


