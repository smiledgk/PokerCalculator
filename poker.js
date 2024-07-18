import { toggleEditMode } from './scripts/editMode/editMode.js'
import { deletePosition } from './scripts/assigningCardsFunctions/clearingCards.js'
import { randomizeCards } from './scripts/randomCards/randomCards.js'
import { checkStreet } from './scripts/checkingFunctions/checkCards.js'
import { fillEVText } from './scripts/EVFunctions/playersEV.js'
import { oddsOfImproving } from './scripts/handAnalysis/odds/oddsOfImproving.js'
import { cards } from './cardRetrieval.js'

const idElements = [
  'FirstPlayerHand1', 'FirstPlayerHand2',
  'SecondPlayerHand1', 'SecondPlayerHand2', 'runSimButton',
  'firstPlayerEVText', 'secondPlayerEVText', 'drawEVText',
  'firstPlayerCurrentHand', 'secondPlayerCurrentHand', 'firstPlayerHighlight', 'secondPlayerHighlight'
];
const classElements = ['randomizeButton', 'deleteButton', 'oddsButton']
const getDomElementById = (id) => document.querySelector(`#${id}`);
const getAllDomElementByClass = (className) => document.querySelectorAll(`.${className}`);


const [firstPlayerCard1, firstPlayerCard2,
  secondPlayerCard1, secondPlayerCard2, runSimButton,
  firstPlayerEVText, secondPlayerEVText, drawEVText,
  firstPlayerCurrentHand, secondPlayerCurrentHand, firstPlayerHighlight, secondPlayerHighlight] = idElements.map(getDomElementById);

cards.unshift(
  { name: 'FirstPlayerHand1', card: firstPlayerCard1, isChosen: false, order: 1 },
  { name: 'FirstPlayerHand2', card: firstPlayerCard2, isChosen: false, order: 2 },
  { name: 'SecondPlayerHand1', card: secondPlayerCard1, isChosen: false, order: 3 },
  { name: 'SecondPlayerHand2', card: secondPlayerCard2, isChosen: false, order: 4 },
)


const [randomButtons, deleteButtons, oddsButtons] = classElements.map(getAllDomElementByClass);
let insertButtons = document.querySelectorAll('.insertButton')
let choiceCards = document.querySelectorAll('.choiceCard')

const playerHandsDOM = { firstPlayerCurrentHand, secondPlayerCurrentHand }
const EVDom = { firstPlayerEVText, secondPlayerEVText, drawEVText }

//getting array of cards containing card divs and parameters, later will be used for calculations

insertButtons.forEach(button => {
  const position = button.id.replace('buttonInsert', '');
  button.addEventListener('click', () => toggleEditMode(cards, position, button, choiceCards))
})
randomButtons.forEach(button => {
  const position = button.id.replace('buttonRandomize', '')
  button.addEventListener('click', () => randomizeCards(cards, position, choiceCards))
})
deleteButtons.forEach(button => {
  const position = button.id.replace('buttonDelete', '')
  button.addEventListener('click', () => deletePosition(cards, position, choiceCards))
})

runSimButton.addEventListener('click', () => fillEVText(100000, cards, playerHandsDOM, EVDom))

oddsButtons.forEach(button => {
  button.addEventListener('click', async function () {
    const player = ((button.id.replace('buttonOddsHand', '') === '1') ? 'firstPlayer' : 'secondPlayer')
    if (checkStreet(cards) == 'River') alert('No more Cards to come')
    else await oddsOfImproving(cards, player, 100000, playerHandsDOM, EVDom)
  });
})











