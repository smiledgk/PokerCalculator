import { RoyalFlush, StraightFlush, Quads, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, Pair, HighCard } from './scripts/checkHandStrength.js'
import { StraightFlushWinnerCheck, QuadsWinnerCheck, FullHouseWinnerCheck, FlushWinnerCheck, StraightWinnerCheck, ThreeOfAKindWinnerCheck, TwoPairWinnerCheck, OnePairWinnerCheck, HighCardWinnerCheck } from './scripts/equalHandsWinnerCheck.js'
import { pokerCombinations, ranks, suits, rankValues, randomNumbers } from './scripts/helperVariables.js'

const idElements = [
  'Flop1', 'Flop2', 'Flop3', 'Turn', 'River',
  'FirstPlayerHand1', 'FirstPlayerHand2',
  'SecondPlayerHand1', 'SecondPlayerHand2', 'buttonclosePopUp', 'runSimButton', 'firstPlayerEVText', 'secondPlayerEVText', 'drawEVText',
  'bestCardsList', 'outsList', 'firstPlayerCurrentHand', 'secondPlayerCurrentHand', 'firstPlayerHighlight', 'secondPlayerHighlight'
];

const classElements = ['randomizeButton', 'deleteButton', 'oddsButton']

const getDomElementById = (id) => document.querySelector(`#${id}`);
const getAllDomElementByClass = (className) => document.querySelectorAll(`.${className}`);

// Destructuring assignment
const [flop1, flop2, flop3, turnC, riverC, firstPlayerCard1, firstPlayerCard2,
  secondPlayerCard1, secondPlayerCard2, buttonclosePopUp, runSimButton,
  firstPlayerEVText, secondPlayerEVText, drawEVText,
  bestCardsList, outsList, firstPlayerCurrentHand, secondPlayerCurrentHand, firstPlayerHighlight, secondPlayerHighlight] = idElements.map(getDomElementById);
const [randomButtons, deleteButtons, oddsButtons] = classElements.map(getAllDomElementByClass);
let insertButtons = document.querySelectorAll('.insertButton')
let choiceCards = document.querySelectorAll('.choiceCard')
//switching edit and non edit modes
let editModeOn = false;
//players array 
const players = ['firstPlayer', 'secondPlayer']
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

insertButtons.forEach(button => {
  const position = button.id.replace('buttonInsert', '');
  button.addEventListener('click', () => toggleEditMode(position, button))
})
randomButtons.forEach(button => {
  const position = button.id.replace('buttonRandomize', '')
  button.addEventListener('click', () => randomizeCards(position))
})
deleteButtons.forEach(button => {
  const position = button.id.replace('buttonDelete', '')
  button.addEventListener('click', () => deletePosition(position))
})
runSimButton.addEventListener('click', () => fillEVText(100000))
oddsButtons.forEach(button => {
  button.addEventListener('click', async function (event) {
    const player = ((button.id.replace('buttonOddsHand', '') === '1') ? 'firstPlayer' : 'secondPlayer')
    if (checkStreet() == 'River') alert('No more Cards to come')
    else await oddsOfImproving(player, 100000)
  });
})

//referable event on buttons, which can be toggled
let clickHandler
//button functions
function toggleEditMode(position, button) {
  openCardsForChoicePopUp(position, button)
  toggleChoiceModeCards()
  const replaceCards = document.querySelectorAll(`#${position} .card`)
  console.log(replaceCards)
  clickHandler = (event) => {
    const card = event.currentTarget
    assignCard(replaceCards, card, true, position);
  }
  choiceCards.forEach(card => {
    card.addEventListener('click', clickHandler)
  })
}

function openCardsForChoicePopUp(position, button) {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');
  const adjPosition =
    position === 'Hand1' ? 'Choose Your' :
      position === 'Hand2' ? `Choose Opponent's` :
        position ? `Choose ${position}` : 'Default Choose Value';
  popup.querySelector('h5').innerText = `${adjPosition} Cards`
  popup.style.top = button.getBoundingClientRect().bottom + 25 + 'px';
  popup.style.left = button.getBoundingClientRect().right + 75 + 'px';
  overlay.style.display = 'block';
  popup.style.display = 'block';
  buttonclosePopUp.addEventListener('click', () => closeCardsForChoicePopUp())
  popup.style.opacity = '1';
}

function closeCardsForChoicePopUp() {
  choiceCards.forEach(card => {
    card.removeEventListener('click', clickHandler)
  })
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
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

// card rows choice operation
function handleMouseEnter() {
  this.classList.add('hover-effect');
}
function handleMouseLeave() {
  this.classList.remove('hover-effect');
}

async function randomizeCards(position) {
  await unassignFaceDownCards(position)
  await removeDeadCard(position)
  const replaceCard = document.querySelectorAll(`#${position} .card`)
  for (let card of replaceCard) {
    const newCard = findAvailableRandomCard()
    assignCard(replaceCard, newCard)
  }
}

function findAvailableRandomCard() {
  let newCard;
  for (let i = 0; i < 100000; i++) {
    newCard = choiceCards[randomNumbers(suits.length * ranks.length)]
    if (!newCard.classList.contains('inUse')) return newCard
  }
}

function assignCard(replaceCard, newCard, isChoice = false, position) {
  const numberOfCardsInPosition = replaceCard.length
  const images = [];
  replaceCard.forEach((divElem) => {
    images.push(divElem.querySelector('img'))
  })
  let counter = 0
  for (let i = 0; i < numberOfCardsInPosition && counter < 1; i++) {
    if (!replaceCard[i].classList.contains('changed')) {
      const img = replaceCard[i].querySelector('img')
      replaceCard[i].classList.add('changed')
      img.src = `Files/Cards/${newCard.id}.png`;
      assignFaceDownCard(newCard, replaceCard[i])
      addDeadCard(newCard)
      counter++
    }
  }
  if (isChoice && checkCardsFilledPosition(position)) closeCardsForChoicePopUp()
  clearCardAnalysis()
  removehighlightCards()
}

function checkCardsFilledPosition(position) {
  const arrayCards = cards.filter(card => card.name.replace(/\d/g, '') == position.replace('Hand1', 'FirstPlayerHand').replace('Hand2', 'SecondPlayerHand'))
  const nonChosenCards = arrayCards.filter(card => card.isChosen === false);
  return nonChosenCards.length !== 0 ? false : true;
}

function assignFaceDownCard(newCard, replaceCard) {
  const arrayCard = cards.find(facedownCard => facedownCard.name == replaceCard.id)
  arrayCard.isChosen = true
  arrayCard.tag = newCard.id
  arrayCard.value = {
    rank: extractCard(newCard.id).rank,
    suit: extractCard(newCard.id).suit
  }
}



function deletePosition(position) {
  unassignFaceDownCards(position)
  removeDeadCard(position)
  clearCardAnalysis()
  removehighlightCards()
}

function unassignFaceDownCards(position) {
  const cardDivs = document.querySelectorAll(`#${position} .card`)
  cardDivs.forEach(card => {
    card.classList.remove('changed')
    card.querySelector('img').src = 'Files/CardFaceDown.png'
  })

}

function removeDeadCard(position) {
  const arrayCards = cards.filter(card => card.name.replace(/\d/g, '') == position.replace('Hand1', 'FirstPlayerHand').replace('Hand2', 'SecondPlayerHand'))
  const cardTags = []
  arrayCards.map(card => {
    card.isChosen = false;
    cardTags.push(card.tag)
    delete card.tag
    delete card.value
  })
  choiceCards.forEach(card => {
    if (cardTags.includes(card.id)) {
      if (card.classList.contains('inUse')) card.classList.remove('inUse')
      card.style.visibility = 'visible';
    }
  })
}

const deadCards = []
function addDeadCard(newCard) {
  deadCards.push(newCard)
  choiceCards.forEach(card => {
    if (card.id === newCard.id) {
      card.style.visibility = 'hidden';
      card.classList.add('inUse')
    }
  });
}

function extractCard(card) {
  const parts = card.split('_');
  let rank = parts[0];
  let suit = parts[2];
  suit = suit[0].toUpperCase() + suit.slice(1)
  if (rank.length > 1) rank = rank[0].toUpperCase() + rank.slice(1)
  return { rank, suit };
}


/////////////////////////// simulation functions after


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

let currentStreet

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
  count = await runSim(count, times, cards1, cards2, street)
  const firstPlayerEV = count.firstPlayerWins * 100 / times
  const secondPlayerEV = count.secondPlayerWins * 100 / times
  const drawPercent = count.draws * 100 / times
  return { firstPlayerEV, secondPlayerEV, drawPercent }
}

async function fillEVText(times) {
  const EVObject = await getPlayersEV(times)
  if (checkStreet() !== 'Preflop') {
    firstPlayerCurrentHand.innerText = yourCurrentHand('firstPlayer').combo
    secondPlayerCurrentHand.innerText = yourCurrentHand('secondPlayer').combo
  }
  firstPlayerEVText.innerText = `${EVObject.firstPlayerEV.toFixed(2)} %`
  secondPlayerEVText.innerText = `${EVObject.secondPlayerEV.toFixed(2)} %`
  drawEVText.innerText = `${EVObject.drawPercent.toFixed(2)} %`
  if (EVObject.firstPlayerEV > EVObject.secondPlayerEV) {
    firstPlayerEVText.style.color = 'green'
    secondPlayerEVText.style.color = 'red'
    if (checkStreet() !== 'Preflop') {
      firstPlayerCurrentHand.style.color = 'green'
      secondPlayerCurrentHand.style.color = 'red'
    }
  } else if (EVObject.firstPlayerEV < EVObject.secondPlayerEV) {
    firstPlayerEVText.style.color = 'red'
    secondPlayerEVText.style.color = 'green'
    if (checkStreet() !== 'Preflop') {
      firstPlayerCurrentHand.style.color = 'red'
      secondPlayerCurrentHand.style.color = 'green'
    }
  } else drawEVText.style.color = 'green'
}

function clearCardAnalysis() {
  if (bestCardsList) bestCardsList.innerHTML = ''
  if (document.getElementById('piechart')) document.getElementById('piechart').innerHTML = ''
  if (outsList) outsList.innerHTML = ''
}

async function oddsOfImproving(player, times) {
  const comboArray = await calculateOddsOfImproving(player, times)
  if (firstPlayerEVText.innerText === '---' && secondPlayerEVText.innerText === '---' && checkStreet() !== 'Preflop') fillEVText(times);
  if (currentStreet !== checkStreet() && checkStreet() !== 'Preflop') {
    fillEVText(times);
  }
  if (checkStreet() !== 'Preflop' || checkStreet() !== 'River') {
    await drawChart(comboArray)
    displayOuts(player)
    displayBestCards(player)
  }
}

function calculateOddsOfImproving(player, times) {
  let street = ''
  checkPlayerCards()
  if (!checkStreet()) alert('Cards are not inserted correctly!')
  else {
    street = checkStreet()
  }
  const cards = allPlayerCards(player, assigningKnownCards(street))
  const otherPlayerHoleCards = allPlayerCards(players.find(neededPlayer => neededPlayer !== player), assigningKnownCards(street)).slice(0, 2)
  let board = []
  if (cards.length > 2) board = cards.slice(2)
  if (board.length === 5) return determineCombo(cards)
  const combinationsArray = pokerCombinations.map(combo => {
    combo.count = 0;
    return combo
  })
  for (let i = 0; i < times; i++) {
    updateComboArray(street, cards, otherPlayerHoleCards, combinationsArray)

  }

  combinationsArray.map(combo => {
    const odds = `${(combo.count * 100 / times).toFixed(3)}%`
    combo.odds = odds
  })
  //console.log(combinationsArray)
  return combinationsArray;
}

function updateComboArray(street, cards, otherPlayerHoleCards, combinationsArray) {
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

function drawChart(comboArray) {
  google.charts.load('current', { 'packages': ['corechart'] });
  google.charts.setOnLoadCallback(function () {
    const dataArray = [['Combination', 'Odds of Getting']]
    for (let combo of comboArray) {
      if (parseInt(combo.odds) !== 0) dataArray.push([combo.name, parseInt(combo.odds)])
    }
    dataArray.forEach(data => {
      if (data[0] == 'High Card') data[0] = 'Nothing'
    })
    const data = google.visualization.arrayToDataTable(dataArray);
    const options = {
      title: 'Chances of Improving to the River',
      backgroundColor: '#f5f5f5',
      width: 600,
      height: 400,
      legend: { position: 'right', alignment: 'center', textStyle: { fontSize: 14 } },
      chartArea: { left: 50, top: 50, width: '75%', height: '75%' }
    };
    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  });
}
const hightlightHand1 = document.querySelector('#Hand1')
const hightlightHand2 = document.querySelector('#Hand2')

function highlightCards(player) {
  if (player === 'firstPlayer') {
    hightlightHand1.classList.add('highlighted')
    if (hightlightHand2.classList.contains('highlighted')) hightlightHand2.classList.remove('highlighted')
  }
  else if (player === 'secondPlayer') {
    hightlightHand2.classList.add('highlighted')
    if (hightlightHand1.classList.contains('highlighted')) hightlightHand1.classList.remove('highlighted')
  }
}

function removehighlightCards() {
  if (hightlightHand1.classList.contains('highlighted')) hightlightHand1.classList.remove('highlighted')
  if (hightlightHand2.classList.contains('highlighted')) hightlightHand2.classList.remove('highlighted')
}


async function displayBestCards(player) {
  highlightCards(player)
  const cardCombos = await findBestCards(player)
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
  const nextStreet = (street === 'Flop') ? 'Turn' : (street === 'Turn' ? 'River' : 'UnknownStreet');
  betterCardsCombos.map(combo => {
    const playerCardsAdj = allPlayerCards(player, assigningKnownCards(street))
    const otherPlayerCards = allPlayerCards(players.find(neededPlayer => neededPlayer !== player), assigningKnownCards(street))
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

function findOuts(player) {const street = checkStreet()
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

function runSim(count, times, cards1, cards2, street) {
  let currentCount = { ...count }
  for (let i = 0; i < times; i++) {
    const result = runSimOnce(cards1, cards2, street)
    currentCount.firstPlayerWins += result.firstPlayerWins;
    currentCount.secondPlayerWins += result.secondPlayerWins;
    currentCount.draws += result.draws;
  }
  return currentCount
}

function runSimOnce(cards1, cards2, street) {
  const firstCards = [...cards1]
  const secondCards = [...cards2]
  const deadCards = firstCards.concat(secondCards)
  if (street === 'Preflop') {
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
  }
  else if (street === 'Flop') {
    const turn = randomizeCard(deadCards)
    deadCards.push(turn)
    const river = randomizeCard(deadCards)
    firstCards.push(turn, river)
    secondCards.push(turn, river)
  }
  else if (street === 'Turn') {
    const river = randomizeCard(deadCards)
    firstCards.push(river)
    secondCards.push(river)
  }
  const calculatedCount = checkWin(firstCards, secondCards)
  currentStreet = street
  return calculatedCount
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
    if (RoyalFlush(cards)) return RoyalFlush(cards);
    else if (StraightFlush(cards)) return StraightFlush(cards)
    else if (Quads(cards)) return Quads(cards)
    else if (FullHouse(cards)) return FullHouse(cards)
    else if (Flush(cards)) return Flush(cards)
    else if (Straight(cards)) return Straight(cards)
    else if (ThreeOfAKind(cards)) return ThreeOfAKind(cards)
    else if (TwoPair(cards)) return TwoPair(cards)
    else if (Pair(cards)) return Pair(cards)
    else return HighCard(cards)
  } else alert(`Please Complete all the Cards`)
}
