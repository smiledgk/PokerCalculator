import { cardDeck } from "../fillingfunctions/helperVariables.js";
const deck = cardDeck()
import { cards } from "../../communityCards.js";

function readCommunityCards() {
    const chosenCards = cards.filter(card => card.isChosen === true).map(card => card.value);
    if (chosenCards.length > 0) {
        return chosenCards;
    }
    return chosenCards; // This line can be simplified to just "return chosenCards;"
}

function filterRange(comboRange, deadCards) {
    const filteredRange = comboRange.filter(obj => {
        // Check if the card is present in chosenCards
        return !deadCards.some(deadCard =>
            obj.cards.some(card =>
                deadCard.rank === card.rank && deadCard.suit === card.suit
            )
        );
    });
    return filteredRange
}

function getRemainingCards(hand1, hand2) {
    const communityCards = readCommunityCards()
    const deadCards = hand1.concat(hand2).concat(communityCards)
    const remainingCards = deck.filter(card =>
        !deadCards.some(handCard => handCard.rank === card.rank && handCard.suit === card.suit)
    );
    return remainingCards;
}

function getCommunityCards(deadCards) {
    const chosenCommunityCards = readCommunityCards()
    const shuffledDeadCards = shuffleArray(deadCards);
    const length = chosenCommunityCards.length
    let communityCards 
    if (length === 0) communityCards = shuffledDeadCards.slice(0, 5) 
    else if (length === 3) communityCards = chosenCommunityCards.concat(shuffledDeadCards.slice(0, 2))
    else if (length === 4) communityCards = chosenCommunityCards.concat(shuffledDeadCards.slice(0, 1))
    else if (length === 5) communityCards = chosenCommunityCards
    return communityCards
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export { getRemainingCards, getCommunityCards, readCommunityCards, filterRange }