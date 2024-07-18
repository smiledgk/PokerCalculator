const openRaisesRangesList = document.querySelectorAll('.openRaisesRangesList')
const threeBetsRangesList = document.querySelectorAll('.threeBetsRangesList')
const defensesRangesList = document.querySelectorAll('.defensesRangesList')
const players = ['player1', 'player2']
import { useRange } from "./scripts/saveRanges/useRange.js"

displaySavedRanges('savedRanges')
for (const player of players) {
    displaySavedRanges('savedRanges', player)
}
function displaySavedRanges(className, player) {
    const savedRanges = Object.entries(localStorage).map(([key, value]) => JSON.parse(value)).filter(item => item && item.class === className);
    for (const range of savedRanges) {
        createListElement(range.name, range.category, player)
    }
}

function createListElement(rangeName, categoryName, player) {
    const li = document.createElement("li");
    const id = rangeName.trim().replace(/\s+/g, '-').toLowerCase();
    li.classList.add("list-group-item");
    const a = document.createElement("a");
    a.href = "#";
    a.classList.add("text-decoration-none", "rangeButtons");
    a.id = id;
    a.textContent = rangeName;
    a.addEventListener("click", function (event) {
        event.preventDefault();
        const range = JSON.parse(localStorage.getItem(rangeName))
        useRange(range, player)
    });
    li.appendChild(a);
    if (player === 'player1') {
        if (categoryName === 'openRaises') openRaisesRangesList[0].appendChild(li)
        else if (categoryName === 'threeBets') threeBetsRangesList[0].appendChild(li)
        else if (categoryName === 'defenses') defensesRangesList[0].appendChild(li)
    } else if (player === 'player2') {
        if (categoryName === 'openRaises') openRaisesRangesList[1].appendChild(li)
        else if (categoryName === 'threeBets') threeBetsRangesList[1].appendChild(li)
        else if (categoryName === 'defenses') defensesRangesList[1].appendChild(li)
    }

}