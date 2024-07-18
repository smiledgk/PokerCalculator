import { assignCard } from '../assigningCardsFunctions/assignCards.js'
const buttonclosePopUp = document.querySelector('#buttonclosePopUp')
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');

let clickHandler
let editModeOn = false;

function toggleEditMode(cards, position, button, choiceCards) {
  openCardsForChoicePopUp(choiceCards, position, button)
  toggleChoiceModeCards(choiceCards)
  const replaceCards = document.querySelectorAll(`#${position} .card`)
  clickHandler = (event) => {
    const card = event.currentTarget
    assignCard(choiceCards, cards, replaceCards, card, true, position);
  }
  choiceCards.forEach(card => {
    card.addEventListener('click', clickHandler)
  })
}

function openCardsForChoicePopUp(choiceCards, position, button) {
  const adjPosition =
    position === 'Hand1' ? 'Choose Your' :
      position === 'Hand2' ? `Choose Opponent's` :
        position ? `Choose ${position}` : 'Default Choose Value';
  popup.querySelector('h5').innerText = `${adjPosition} Cards`
  popup.style.top = button.getBoundingClientRect().bottom + 25 + 'px';
  popup.style.left = button.getBoundingClientRect().right + 75 + 'px';
  overlay.style.display = 'block';
  popup.style.display = 'block';
  buttonclosePopUp.addEventListener('click', () => closeCardsForChoicePopUp(choiceCards, overlay, popup))
  popup.style.opacity = '1';
}

function closeCardsForChoicePopUp(choiceCards, overlay, popup) {
  choiceCards.forEach(card => {
    card.removeEventListener('click', clickHandler)
  })
  overlay.style.display = 'none';
  popup.style.display = 'none';
}

function toggleChoiceModeCards(choiceCards) {
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

export { toggleEditMode, closeCardsForChoicePopUp };