
import { RoyalFlush, StraightFlush, Quads, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, Pair, HighCard } from './scripts/checkHandStrength.js'
import { StraightFlushWinnerCheck, QuadsWinnerCheck, FullHouseWinnerCheck, FlushWinnerCheck, StraightWinnerCheck, ThreeOfAKindWinnerCheck, TwoPairWinnerCheck, OnePairWinnerCheck, HighCardWinnerCheck } from './scripts/equalHandsWinnerCheck.js'
import { pokerCombinations, ranks, suits, rankValues, randomNumbers } from './scripts/helperVariables.js'

//getting buttons and containers
let choiceCards = document.querySelectorAll('.choiceCard')
//getting community cards
const flop1 = document.querySelector('#Flop1')
const flop2 = document.querySelector('#Flop2')
const flop3 = document.querySelector('#Flop3')
const turnC = document.querySelector('#Turn')
const riverC = document.querySelector('#River')
//first player hand cards
const firstPlayerCard1 = document.querySelector('#FirstPlayerHand1')
const firstPlayerCard2 = document.querySelector('#FirstPlayerHand2')
//second player hand
const secondPlayerCard1 = document.querySelector('#SecondPlayerHand1')
const secondPlayerCard2 = document.querySelector('#SecondPlayerHand2')
//switching edit and non edit modes
let editModeOn = false;
let lockButtons = false;
const players = ['firstPlayer', 'secondPlayer']
//facedown card buttons for editing cards, insert buttons for multiple editing, random buttons for random assignment
const faceDownCards = document.querySelectorAll('.facedownCard')
let insertButtons = document.querySelectorAll('.insertButton')
const randomButtons = document.querySelectorAll('.randomizeButton')
const buttonclosePopUp = document.querySelector('#buttonclosePopUp')
const deleteButtons = document.querySelectorAll('.deleteButton')
//calculation Buttons
const runSimButton = document.querySelector('#runSimButton')
const oddsForm = document.getElementById('formOdds')
//ev display
const firstPlayerEVText = document.querySelector('#firstPlayerEVText')
const secondPlayerEVText = document.querySelector('#secondPlayerEVText')
const drawEVText = document.querySelector('#drawEVText')
//combos and outs list
const pokerCombosList = document.querySelector('#pokerCombosList')
const bestCardsList = document.querySelector('#bestCardsList')
const outsList = document.querySelector('#outsList')
const yourCurrentHandText = document.querySelector('#yourCurrentHand')

//getting array of cards containing card divs and parameters, later will be used for calculations
const cards = [
  { name: 'FirstPlayerHand1', card: firstPlayerCard1, isChosen: false, order: 1 },
  { name: 'FirstPlayerHand2', card: firstPlayerCard2, isChosen: false, order: 2 },
  { name: 'SecondPlayerHand1', card: secondPlayerCard1, isChosen: false, order: 3 },
  { name: 'SecondPlayerHand2', card: secondPlayerCard2, isChosen: false, order: 4 },
  { name: 'Flop1', card: flop1, isChosen: false, order: 5 },
  { name: 'Flop2', card: flop2, isChosen: false, order: 6 },
  { name: 'Flop3', card: flop3, isChosen: false, order: 7 },
  { name: 'Turn', card: turnC, isChosen: false, order: 8 },
  { name: 'River', card: riverC, isChosen: false, order: 9 }

];

//assignment of functions for buttons
faceDownCards.forEach(button => {
  button.addEventListener('click', toggleEditModeSingle)
})

insertButtons.forEach(button => {
  button.addEventListener('click', toggleEditModeButton)
})

randomButtons.forEach(button => {
  const target = button.id.replace('buttonRandomize', '')
  button.addEventListener('click', () => randomizeCards(target))
})

deleteButtons.forEach(button => {
  const position = button.id.replace('buttonDelete', '')
  button.addEventListener('click', () => deleteStreet(position))
})

buttonclosePopUp.addEventListener('click', closeCardsForChoicePopUp)

//button functions
function toggleEditModeSingle(event) {
  event.preventDefault()
  replaceCard = this.parentNode
  const button = event.target
  lockAllButtons(button)
  toggleChooseCardMode(replaceCard)
  toggleChoiceModeCards()
  choiceCards.forEach(card => {
    card.addEventListener('click', () => editCard(replaceCard, card))
  })
}

function toggleEditModeButton(event) {
  const position = event.currentTarget.id.replace('buttonInsert', '');
  toggleEditModeButtonHelper(position);
}
function toggleEditModeButtonHelper(position) {
  lockButtons = !lockButtons
  openCardsForChoicePopUp()
  const button = document.querySelector(`#buttonInsert${position}`)
  const replaceCards = document.querySelectorAll(`#${position} .card`)
  if (lockButtons) {
    lockAllButtons(button)
  } else {
    for (let insertButton of insertButtons) {
      insertButton.addEventListener('click', toggleEditModeButton)
    }
    faceDownCards.forEach(button => {
      button.addEventListener('click', toggleEditModeSingle);
    });
  }
  toggleChooseCardMode(undefined, position)
  toggleChoiceModeCards()
  choiceCards.forEach(card => {
    card.addEventListener('click', () => editCard(replaceCards, card))
  })
}

function lockAllButtons(button) {
  insertButtons.forEach(otherButton => {
    if (otherButton !== button) {
      otherButton.removeEventListener('click', toggleEditModeButton);
    }
  });
  faceDownCards.forEach(otherButton => {
    if (otherButton !== button) {
      otherButton.removeEventListener('click', toggleEditModeSingle);
    }
  });
  randomButtons.forEach(otherButton => {
    if (otherButton !== button) {
      otherButton.removeEventListener('click', randomizeCards)
    }
  })
}

function openCardsForChoicePopUp() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';
  setTimeout(function () {
    popup.style.opacity = '1';
  }, 50);
}

function closeCardsForChoicePopUp() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
  setTimeout(function () {
    popup.style.display = 'none';
  }, 300);
}

function deleteStreet(position) {
  const replaceCards = document.querySelectorAll(`#${position} .card`)
  console.log(replaceCards)
  replaceCards.forEach(card => {
    const img = card.querySelector('img')
    img.src = 'Files/CardFaceDown.png';
    card.classList.remove('changed')
  })
  const arrayCard = cards.find(facedownCard => facedownCard.name.replace(/\d/g, '') == position.replace('Hand1', 'FirstPlayerHand').replace('Hand2', 'SecondPlayerHand'))
  arrayCard.isChosen = false
  arrayCard.card.classList.remove('changed')
  arrayCard.tag = ''
  arrayCard.value = {
    rank: '',
    suit: ''
  }
}

function unlockAllButtons() {
  faceDownCards.forEach(button => {
    button.addEventListener('click', toggleEditModeSingle)
  })

  insertButtons.forEach(button => {
    button.addEventListener('click', toggleEditModeButton)
  })

  randomButtons.forEach(button => {
    const target = button.id.replace('buttonRandomize', '')
    button.addEventListener('click', () => randomizeCards(target))
  })
}

// card rows choice operation
function toggleChooseCardMode(cardChange, position) {
  if (!position) cardChange.classList.toggle('hover-effect')
  else if (position) {
    const cards = document.querySelectorAll(`#${position} .card`)
    cards.forEach(card => {
      card.classList.toggle('hover-effect')
    })
  }
}
function toggleChoiceModeCards() {
  editModeOn = !editModeOn;
  choiceCards.forEach(card => {
    // Clear all existing event listeners
    card.removeEventListener("mouseenter", handleMouseEnter);
    card.removeEventListener("mouseleave", handleMouseLeave);
    if (editModeOn) {
      // Re-add event listeners when hover effect is active
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }
  });
}
function handleMouseEnter() {
  this.classList.add('hover-effect');
}
function handleMouseLeave() {
  this.classList.remove('hover-effect');
}

function randomizeCards(target) {
  const randomNrs = randomNumbers()
  if (target == 'Flop') {
    editCard(flop1, choiceCards[randomNrs[4]])
    editCard(flop2, choiceCards[randomNrs[5]])
    editCard(flop3, choiceCards[randomNrs[6]])
  } else if (target == 'Turn') {
    editCard(turnC, choiceCards[randomNrs[7]])
  } else if (target == 'River') {
    editCard(riverC, choiceCards[randomNrs[8]])
  } else if (target == 'Hand1') {
    editCard(firstPlayerCard1, choiceCards[randomNrs[0]])
    editCard(firstPlayerCard2, choiceCards[randomNrs[1]])
  } else if (target == 'Hand2') {
    editCard(secondPlayerCard1, choiceCards[randomNrs[2]])
    editCard(secondPlayerCard2, choiceCards[randomNrs[3]])
  }
}

function editCard(replaceCard, newCard) {
  //check if button or card is pressed
  if (NodeList.prototype.isPrototypeOf(replaceCard)) {
    let counter = 0
    let changed = false
    for (let i = 0; i < replaceCard.length; i++) {
      if (counter < 1) {
        if (!replaceCard[i].classList.contains('changed')) {
          const img = replaceCard[i].querySelector('img')
          img.src = `Files/Cards/${newCard.id}.png`;
          assignFaceDownCard(newCard, replaceCard[i])
          replaceCard[i].classList.add('changed')
          counter++
          if (i === replaceCard.length - 1) changed = true
          if (changed) unlockAllButtons()
        }
      }
    }
    /*faceDownCards.forEach(button => {
      button.addEventListener('click', toggleEditModeSingle);
    });
    insertButtons.forEach(button => {
      button.addEventListener('click', toggleEditModeButton);
    });*/
  } else {
    const img = replaceCard.querySelector('img');
    replaceCard.classList.add('changed')
    img.src = `Files/Cards/${newCard.id}.png`;
    assignFaceDownCard(newCard, replaceCard)
    faceDownCards.forEach(button => {
      button.addEventListener('click', toggleEditModeSingle);
    });
  }
}

function assignFaceDownCard(newCard, replaceCard) {

  const cardValue = newCard.id
  choiceCards.forEach(card => {
    if (card.id === cardValue) {
      card.style.visibility = 'hidden';
    }
  });

  const arrayCard = cards.find(facedownCard => facedownCard.name == replaceCard.id)
  arrayCard.isChosen = true
  arrayCard.tag = newCard.id
  arrayCard.value = {
    rank: extractCard(newCard.id).rank,
    suit: extractCard(newCard.id).suit
  }
}

function extractCard(card) {
  const parts = card.split('_');
  let rank = parts[0];
  let suit = parts[2];
  suit = suit[0].toUpperCase() + suit.slice(1)
  if (rank.length > 1) rank = rank[0].toUpperCase() + rank.slice(1)
  return { rank, suit };
}


/////////////////////////// simulation after
runSimButton.addEventListener('click', () => fillEVText(100000))
oddsForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const player = ((document.getElementById('dropdownInput').value.replace('Hand', '') === '1') ? 'firstPlayer' : 'secondPlayer')
  if (checkStreet() == 'River') alert('No more Cards to come')
  else await oddsOfImproving(player, 100000)
});

let firstPlayerHand = []
let secondPlayerHand = []
let flop;
let turn;
let river;

function checkPlayerCards() {
  const cardsFiltered = cards.filter(card => card.isChosen === true).filter(card => card.name === 'FirstPlayerHand1' || card.name === 'FirstPlayerHand2' || card.name === 'SecondPlayerHand1' || card.name === 'SecondPlayerHand2')
  if (cardsFiltered.length === 4) return true
  else {
    alert('Input Player 1 and 2 Cards!')
  }
}

function checkStreet() {
  const cardsFiltered = cards.filter(card => card.isChosen === true)
  switch (cardsFiltered.length) {
    case 4:
      return "Preflop"
    case 5:
      return false
    case 6:
      return false
    case 7:
      return "Flop"
    case 8:
      return "Turn"
    case 9:
      return 'River'
  }
}

function assigningKnownCards(street) {
  if (cards[0].value && cards[1].value) {
    firstPlayerHand = [
      {
        firstCard: {
          rank: cards[0].value.rank,
          suit: cards[0].value.suit
        },
        secondCard: {
          rank: cards[1].value.rank,
          suit: cards[1].value.suit
        },
      }
    ];
  }

  if (cards[2].value && cards[3].value) {
    secondPlayerHand = [
      {
        firstCard: {
          rank: cards[2].value.rank,
          suit: cards[2].value.suit
        },
        secondCard: {
          rank: cards[3].value.rank,
          suit: cards[3].value.suit
        },
      }
    ];
  }

  if (street === 'Preflop') return { firstPlayerHand, secondPlayerHand, flop: {}, turn: {}, river: {} }

  if (street === 'Flop') {
    if (cards[4].value && cards[5].value && cards[6].value) {
      flop = [
        {
          firstCard: {
            rank: cards[4].value.rank,
            suit: cards[4].value.suit
          },
          secondCard: {
            rank: cards[5].value.rank,
            suit: cards[5].value.suit
          },
          thirdCard: {
            rank: cards[6].value.rank,
            suit: cards[6].value.suit
          },
        }
      ]
    }
    return { firstPlayerHand, secondPlayerHand, flop, turn: {}, river: {} }
  } else if (street === 'Turn') {
    if (cards[4].value && cards[5].value && cards[6].value) {
      flop = [
        {
          firstCard: {
            rank: cards[4].value.rank,
            suit: cards[4].value.suit
          },
          secondCard: {
            rank: cards[5].value.rank,
            suit: cards[5].value.suit
          },
          thirdCard: {
            rank: cards[6].value.rank,
            suit: cards[6].value.suit
          },
        }
      ]
    }
    if (cards[7].value) turn = { rank: cards[7].value.rank, suit: cards[7].value.suit }
    return { firstPlayerHand, secondPlayerHand, flop, turn, river: {} }
  } else if (street === 'River') {
    flop = [
      {
        firstCard: {
          rank: cards[4].value.rank,
          suit: cards[4].value.suit
        },
        secondCard: {
          rank: cards[5].value.rank,
          suit: cards[5].value.suit
        },
        thirdCard: {
          rank: cards[6].value.rank,
          suit: cards[6].value.suit
        },
      }
    ]
    if (cards[7].value) turn = { rank: cards[7].value.rank, suit: cards[7].value.suit }
    if (cards[8].value) river = { rank: cards[8].value.rank, suit: cards[8].value.suit }
    return { firstPlayerHand, secondPlayerHand, flop, turn, river }
  }
}

function allPlayerCards(player, assignedKnownCards) {
  const allCards = []
  if (player == "firstPlayer") {
    allCards[0] = assignedKnownCards.firstPlayerHand[0].firstCard
    allCards[1] = assignedKnownCards.firstPlayerHand[0].secondCard

  } else if (player == "secondPlayer") {
    allCards[0] = assignedKnownCards.secondPlayerHand[0].firstCard
    allCards[1] = assignedKnownCards.secondPlayerHand[0].secondCard
  }

  if (checkStreet() === 'Flop') {
    allCards[2] = assignedKnownCards.flop[0].firstCard
    allCards[3] = assignedKnownCards.flop[0].secondCard
    allCards[4] = assignedKnownCards.flop[0].thirdCard
  }
  if (checkStreet() === 'Turn') {
    allCards[2] = assignedKnownCards.flop[0].firstCard
    allCards[3] = assignedKnownCards.flop[0].secondCard
    allCards[4] = assignedKnownCards.flop[0].thirdCard
    allCards[5] = assignedKnownCards.turn
  }

  if (checkStreet() === 'River') {
    allCards[2] = assignedKnownCards.flop[0].firstCard
    allCards[3] = assignedKnownCards.flop[0].secondCard
    allCards[4] = assignedKnownCards.flop[0].thirdCard
    allCards[5] = assignedKnownCards.turn
    allCards[6] = assignedKnownCards.river
  }
  return allCards
}

for (let combo of pokerCombinations) {
  const li = document.createElement('li')
  li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
  li.style.visibility = 'hidden'
  li.innerText = combo.name
  pokerCombosList.appendChild(li)
}

async function getPlayersEV(times) {
  let count = { firstPlayerWins: 0, secondPlayerWins: 0, draws: 0 }
  let street = ''
  checkPlayerCards()
  if (!checkStreet()) alert('Cards are not inserted correctly!')
  else {
    street = checkStreet()
  }
  const cards1 = allPlayerCards('firstPlayer', assigningKnownCards(street))
  const cards2 = allPlayerCards('secondPlayer', assigningKnownCards(street))
  if (street === 'Preflop') count = await runSimPreflop(count, times, cards1, cards2)
  else if (street === 'Flop') count = await runSimFlop(count, times, cards1, cards2)
  else if (street === 'Turn') count = await runSimTurn(count, times, cards1, cards2)
  else if (street === 'River') count = checkWin(cards1, cards2)
  const sum = count.firstPlayerWins + count.secondPlayerWins + count.draws
  const firstPlayerEV = count.firstPlayerWins * 100 / sum
  const secondPlayerEV = count.secondPlayerWins * 100 / sum
  const drawPercent = count.draws * 100 / sum
  return { firstPlayerEV, secondPlayerEV, drawPercent }
}

async function fillEVText(times) {
  const EVObject = await getPlayersEV(times)
  console.log(EVObject)
  firstPlayerEVText.innerText = `${EVObject.firstPlayerEV.toFixed(2)} %`
  secondPlayerEVText.innerText = `${EVObject.secondPlayerEV.toFixed(2)} %`
  drawEVText.innerText = `${EVObject.drawPercent.toFixed(2)} %`

  if (EVObject.firstPlayerEV > EVObject.secondPlayerEV) {
    firstPlayerEVText.style.color = 'green'
    secondPlayerEVText.style.color = 'red'
  } else if (EVObject.firstPlayerEV < EVObject.secondPlayerEV) {
    firstPlayerEVText.style.color = 'red'
    secondPlayerEVText.style.color = 'green'
  } else drawEVText.style.color = 'green'
}

async function oddsOfImproving(player, times) {
  const comboArray = await calculateOddsOfImproving(player, times)
  const currentHand = yourCurrentHand(player)
  yourCurrentHandText.innerText = `Your Hand is ${currentHand.combo}`
  updateComboList(comboArray, currentHand)
  displayOuts(player)
  displayBestCards(player)
}

function calculateOddsOfImproving(player, times) {
  let street = ''
  checkPlayerCards()
  if (!checkStreet()) alert('Cards are not inserted correctly!')
  else {
    street = checkStreet()
  }
  const cards = allPlayerCards(player, assigningKnownCards(street))
  const holeCards = cards.slice(0, 2)
  const otherPlayerHoleCards = allPlayerCards(players.find(neededPlayer => neededPlayer !== player), assigningKnownCards(street)).slice(0, 2)
  let board = []
  if (cards.length > 2) board = cards.slice(2)
  if (board.length === 5) return determineCombo(cards)
  const combinationsArray = pokerCombinations.map(combo => {
    combo.count = 0;
    return combo
  })

  for (let i = 0; i < times; i++) {
    const updatedCards = [...cards]
    if (street == 'Preflop') {
      const deadCards = [...updatedCards]
      if (otherPlayerHoleCards) deadCards.concat(otherPlayerHoleCards)
      //logic for removing 2nd player dead cards
      const flop1 = randomizeCard(deadCards)
      deadCards.push(flop1)
      const flop2 = randomizeCard(deadCards)
      deadCards.push(flop2)
      const flop3 = randomizeCard(deadCards)
      deadCards.push(flop3)
      const turn = randomizeCard(deadCards)
      deadCards.push(turn)
      const river = randomizeCard(deadCards)
      updatedCards.push(flop1, flop2, flop3, turn, river)
    } else if (street == 'Flop') {
      //logic for removing 2nd player dead cards
      const deadCards = [...updatedCards]
      if (otherPlayerHoleCards) deadCards.concat(otherPlayerHoleCards)
      const turn = randomizeCard(deadCards)
      deadCards.push(turn)
      const river = randomizeCard(deadCards)
      updatedCards.push(turn, river)
    } else if (street == 'Turn') {
      const deadCards = [...updatedCards]
      if (otherPlayerHoleCards) deadCards.concat(otherPlayerHoleCards)
      const river = randomizeCard(deadCards)
      updatedCards.push(river)
    }
    const resultCombo = determineCombo(updatedCards)
    const foundCombo = combinationsArray.find(item => item.strength === resultCombo.strength);
    if (foundCombo) {
      foundCombo.count += 1;
    }
  }
  combinationsArray.map(combo => {
    const odds = `${(combo.count * 100 / times).toFixed(3)}%`
    combo.odds = odds
  })
  return combinationsArray;
}

function updateComboList(comboArray, currentHand) {
  const liElements = pokerCombosList.querySelectorAll('li');
  if (pokerCombosList) {
    liElements.forEach((li, index) => {
      li.innerHTML = ''
      const name = comboArray.find(combo => comboArray.indexOf(combo) === index).name
      const odds = comboArray.find(combo => comboArray.indexOf(combo) === index).odds
      li.innerText = name
      const badge = document.createElement('span')
      badge.classList.add('badge', 'bg-light', 'justify-content-between', 'text-bg-light',)
      badge.innerText = odds
      if (name === currentHand.combo) li.remove()
      if (parseInt(odds) === 0) li.remove()
      li.style.visibility = 'visible'
      li.appendChild(badge)
    });
  }
}

function displayBestCards(player) {
  const cardCombos = findBestCards(player)
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
    const badge = document.createElement('span')
    badge.classList.add('badge', 'bg-light', 'justify-content-between', 'text-bg-light',)
    badge.innerText = cardCombo.combo.combo
    li.appendChild(badge)
    bestCardsList.appendChild(li)
  }
}

function displayOuts(player) {
  // can be merged with previous
  if (outsList) outsList.innerHTML = ''
  if (findOuts(player)) {
    const outCombos = findOuts(player)
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

function yourCurrentHand(player) {
  const street = checkStreet()
  const playerCards = allPlayerCards(player, assigningKnownCards(street))
  const playerCombo = determineCombo(playerCards)
  return playerCombo
}

function findBestCards(player) {
  const remainingCards = gettingRemainingCards()
  const street = checkStreet()
  const playerCards = allPlayerCards(player, assigningKnownCards(street))
  const presentComboStrength = determineCombo(playerCards).strength
  const cardsCombos = getAllCombos(player, remainingCards)
  const betterCardsCombos = cardsCombos.filter(c => c.combo.strength > presentComboStrength)
  //const sortedCombos = betterCardsCombos.sort((a, b) => b.combo.strength - a.combo.strength);
  const sortedCombos = betterCardsCombos.sort((a, b) => {
    if (b.combo.strength !== a.combo.strength) {
      return b.combo.strength - a.combo.strength;
    }
    return rankValues[b.nextCard.rank] - rankValues[a.nextCard.rank];
  });

  return sortedCombos
}

function findOuts(player) {
  const street = checkStreet()
  const playerCards = allPlayerCards(player, assigningKnownCards(street))
  const otherPlayerCards = allPlayerCards(players.find(neededPlayer => neededPlayer !== player), assigningKnownCards(street))
  const score = checkWin(playerCards, otherPlayerCards)
  if (score.firstPlayerWins > score.secondPlayerWins && player == 'firstPlayer') return false
  if (score.firstPlayerWins > score.secondPlayerWins && player == 'secondPlayer') return false
  //until now correct
  const newCards = gettingRemainingCards(player)
  const cardsCombosFirst = getAllCombos('firstPlayer', newCards)
  const cardsCombosSecond = getAllCombos('secondPlayer', newCards)
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

function gettingRemainingCards() {
  const street = checkStreet()
  const cards1 = allPlayerCards('firstPlayer', assigningKnownCards(street))
  const cards2 = allPlayerCards('secondPlayer', assigningKnownCards(street)).slice(0, 2)
  const cards = cards1.concat(cards2)
  const allCards = []
  for (let suit1 of suits) {
    for (let i = 0; i < ranks.length; i++) {
      allCards.push({ rank: ranks[i], suit: suit1 })
    }
  }
  const remainingCards = allCards.filter(card => !cards.some(c => c.rank === card.rank && c.suit === card.suit))
  return remainingCards
}

function getAllCombos(player, remainingCards) {
  const street = checkStreet()
  const playerCards = allPlayerCards(player, assigningKnownCards(street))
  const result = []
  for (let nextCard of remainingCards) {
    const existingCards = [...playerCards]
    existingCards.push(nextCard)
    const combo = determineCombo(existingCards)
    result.push({ nextCard, combo })
  }
  return result
}

function runSimTurn(count, times, cards1, cards2) {
  let currentCount = { ...count }
  currentCount.firstPlayerWins
  for (let i = 0; i < times; i++) {
    const firstCards = [...cards1]
    const secondCards = [...cards2]
    const deadCards = firstCards.concat(secondCards)
    const river = randomizeCard(deadCards)
    firstCards.push(river)
    secondCards.push(river)
    const calculatedCount = checkWin(firstCards, secondCards)
    currentCount.firstPlayerWins += calculatedCount.firstPlayerWins;
    currentCount.secondPlayerWins += calculatedCount.secondPlayerWins;
    currentCount.draws += calculatedCount.draws;
  }
  return currentCount
}

function runSimFlop(count, times, cards1, cards2) {
  let currentCount = { ...count }
  currentCount.firstPlayerWins
  for (let i = 0; i < times; i++) {
    const firstCards = [...cards1]
    const secondCards = [...cards2]
    const deadCards = firstCards.concat(secondCards)
    const turn = randomizeCard(deadCards)
    deadCards.push(turn)
    const river = randomizeCard(deadCards)
    firstCards.push(turn, river)
    secondCards.push(turn, river)
    const calculatedCount = checkWin(firstCards, secondCards)
    currentCount.firstPlayerWins += calculatedCount.firstPlayerWins;
    currentCount.secondPlayerWins += calculatedCount.secondPlayerWins;
    currentCount.draws += calculatedCount.draws;
  }
  return currentCount
}

function runSimPreflop(count, times, cards1, cards2) {
  let currentCount = { ...count }
  currentCount.firstPlayerWins
  for (let i = 0; i < times; i++) {
    const firstCards = [...cards1]
    const secondCards = [...cards2]
    const deadCards = firstCards.concat(secondCards)
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
    const calculatedCount = checkWin(firstCards, secondCards)
    currentCount.firstPlayerWins += calculatedCount.firstPlayerWins;
    currentCount.secondPlayerWins += calculatedCount.secondPlayerWins;
    currentCount.draws += calculatedCount.draws;
  }
  return currentCount
}

function randomizeCard(existingCards) {
  let card;
  do {
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    card = {
      rank: rank,
      suit: suit
    }
  } while ((existingCards.some(existingCard => existingCard.rank === card.rank && existingCard.suit === card.suit)))
  return card
}

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
  if (cards.length >= 5) {
    let combination = {}
    if (RoyalFlush(cards)) combination = RoyalFlush(cards);
    else if (StraightFlush(cards)) combination = StraightFlush(cards)
    else if (Quads(cards)) combination = Quads(cards)
    else if (FullHouse(cards)) combination = FullHouse(cards)
    else if (Flush(cards)) combination = Flush(cards)
    else if (Straight(cards)) combination = Straight(cards)
    else if (ThreeOfAKind(cards)) combination = ThreeOfAKind(cards)
    else if (TwoPair(cards)) combination = TwoPair(cards)
    else if (Pair(cards)) combination = Pair(cards)
    else combination = HighCard(cards)
    return combination
  } else alert(`Please Complete all the Cards`)
}
