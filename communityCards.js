import { toggleEditMode } from './scripts/editMode/editMode.js'
import { randomizeCards } from './scripts/randomCards/randomCards.js'
import { deletePosition } from './scripts/assigningCardsFunctions/clearingCards.js'
import { cards } from './cardRetrieval.js'

let choiceCards = document.querySelectorAll('.choiceCard')
let insertButtons = document.querySelectorAll('.insertButton')
let deleteButtons = document.querySelectorAll('.deleteButton')
let randomButtons = document.querySelectorAll('.randomizeButton')

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

export { cards }

