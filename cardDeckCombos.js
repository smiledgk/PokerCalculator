import { rankedHandRankings } from './scripts/fillingfunctions/handRanking.js'
export const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const ranksShort = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const ranksShortReverted = ranksShort.reverse()
const ranksReverted = ranks.reverse()

export const rankValues = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'Jack': 11, 'Queen': 12, 'King': 13, 'Ace': 14
}


function cardsMarkupTable() {
    let combos = []
    for (let i = 0; i < ranksShortReverted.length; i++) {
        let combo
        if (i > 0) {
            for (let j = 0; j < i; j++) {
                combo = {
                    markup: ranksShortReverted[j] + ranksShortReverted[i] + 'o',
                    firstCardRank: ranksReverted[j],
                    secondCardRank: ranksReverted[i],
                    type: 'off-suited',
                }
                combos.push(combo)
            }
        }
        for (let k = i; k < ranksShortReverted.length; k++) {
            combo = {
                markup: ranksShortReverted[i] + ranksShortReverted[k],
                firstCardRank: ranksReverted[i],
                secondCardRank: ranksReverted[k],
            }
            if (combo.firstCardRank === combo.secondCardRank) {
                combo.type = 'pair'
            } else {
                combo.type = 'suited'
                combo.markup = combo.markup + 's'
            }
            combos.push(combo)
        }
    }
    return combos
}

function buildAllCombos(cards) {
    cards.forEach(combo => {
        const foundHand = rankedHandRankings.find(hand => hand.markup === combo.markup)
        combo.EV = foundHand.EV.toFixed(5)
        combo.rank = foundHand.rank
        combo.rangeRanking = (combo.rank * 100 / 170).toFixed(4)
        assignCategory(combo)
        switch (combo.type) {
            case 'off-suited':
                combo.combinations = getOffsuitedCombos(combo)[0]
                combo.comboMarkups = getOffsuitedCombos(combo)[1]
                break;

            case 'suited':
                combo.combinations = getSuitedCombos(combo)[0]
                combo.comboMarkups = getSuitedCombos(combo)[1]
                break;

            case 'pair':
                combo.combinations = getPairs(combo)[0]
                combo.comboMarkups = getPairs(combo)[1]
                break;
        }
        combo.numberOfCombos = combo.combinations.length
    })
    const modifiedCards = cards.map(combo => {
        const { firstCardRank, secondCardRank, ...rest } = combo;
        return rest;
    });

    return modifiedCards;
}



function getOffsuitedCombos(combo) {
    let combinations = []
    let comboMarkups = []
    for (let suit of suits) {
        for (let suit1 of suits) {
            if (suit1 !== suit) {
                let cards = [
                    {
                        rank: combo.firstCardRank,
                        suit: suit
                    },
                    {
                        rank: combo.secondCardRank,
                        suit: suit1
                    }
                ];
                let markup = (combo.firstCardRank.charAt(0) === '1' ? 'T' : combo.firstCardRank.charAt(0)) + suit.charAt(0).toLowerCase()
                    + (combo.secondCardRank.charAt(0) === '1' ? 'T' : combo.secondCardRank.charAt(0)) + suit1.charAt(0).toLowerCase()
                combinations.push(cards);
                comboMarkups.push(markup)
            }
        }
    }
    return [combinations, comboMarkups];
}

function getSuitedCombos(combo) {
    let combinations = []
    let comboMarkups = []
    for (let suit of suits) {
        for (let suit1 of suits) {
            if (suit1 === suit) {
                let cards = [
                    {
                        rank: combo.firstCardRank,
                        suit: suit
                    },
                    {
                        rank: combo.secondCardRank,
                        suit: suit1
                    }
                ];
                let markup = (combo.firstCardRank.charAt(0) === '1' ? 'T' : combo.firstCardRank.charAt(0)) + suit.charAt(0).toLowerCase()
                    + (combo.secondCardRank.charAt(0) === '1' ? 'T' : combo.secondCardRank.charAt(0)) + suit1.charAt(0).toLowerCase()
                combinations.push(cards);
                comboMarkups.push(markup)
            }
        }
    }
    return [combinations, comboMarkups];
}

function getPairs(combo) {
    let combinations = []
    let comboMarkups = []
    for (let i = 0; i < suits.length; i++) {
        if (i !== suits.length - 1) {
            for (let j = i + 1; j < suits.length; j++) {
                let cards = [
                    {
                        rank: combo.firstCardRank,
                        suit: suits[i]
                    },
                    {
                        rank: combo.secondCardRank,
                        suit: suits[j]
                    }
                ];
                let markup = (combo.firstCardRank.charAt(0) === '1' ? 'T' : combo.firstCardRank.charAt(0)) + suits[i].charAt(0).toLowerCase()
                    + (combo.secondCardRank.charAt(0) === '1' ? 'T' : combo.secondCardRank.charAt(0)) + suits[j].charAt(0).toLowerCase()
                combinations.push(cards);
                comboMarkups.push(markup)
            }
        }
    }
    return [combinations, comboMarkups];
}

function assignCategory(combo) {
    if (rankValues[combo.firstCardRank] >= 10 && rankValues[combo.secondCardRank] >= 10 && combo.type !== 'pair') {
        combo.category = 'broadway'
    } else if (rankValues[combo.firstCardRank] - rankValues[combo.secondCardRank] === 1 && combo.type === 'suited') {
        combo.category = 'suited-connectors'
    } else if (rankValues[combo.firstCardRank] - rankValues[combo.secondCardRank] === 1 && combo.type === 'off-suited') {
        combo.category = 'offsuited-connectors'
    } else if (rankValues[combo.firstCardRank] - rankValues[combo.secondCardRank] === 2 && combo.type === 'suited') {
        combo.category = 'suited-onegapers'
    } else if (rankValues[combo.firstCardRank] - rankValues[combo.secondCardRank] === 3 && combo.type === 'suited') {
        combo.category = 'suited-twogapers'
    } else if (rankValues[combo.firstCardRank] === 14 && combo.type === 'suited') {
        combo.category = 'suited-aces'
    } else if (rankValues[combo.firstCardRank] === 14 && combo.type === 'off-suited') {
        combo.category = 'offsuited-aces'
    } else if (rankValues[combo.firstCardRank] === rankValues[combo.secondCardRank]) {
        combo.category = 'pairs'
    } else {
        combo.category = 'other'
    }
}


const cardsTable = cardsMarkupTable()
const allCombos = buildAllCombos(cardsTable)

export { allCombos }




