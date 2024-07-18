const openRaisesRangesList = document.querySelector('.openRaisesRangesList')
const threeBetsRangesList = document.querySelector('.threeBetsRangesList')
const defensesRangesList = document.querySelector('.defensesRangesList')

const saveRangeBtn = document.querySelector('#saveRangeBtn')
const closeButton = document.querySelector(".close");
saveRangeBtn.addEventListener('click', openNameAssignment)
const modal = document.getElementById("myModal");
const comboCells = document.querySelectorAll('.comboCell')

displaySavedRanges('savedRanges', 'player1')

import { currentRanges } from "./pokerTable.js"
import { useRange } from "./scripts/saveRanges/useRange.js";

function openNameAssignment() {
    $(modal).modal("show");
    closeButton.addEventListener("click", function () {
        $(modal).modal("hide");
    });
    const saveForm = document.getElementById("saveForm");
    saveForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const rangeName = document.getElementById("nameInput").value;
        const categoryName = document.getElementById("categoryInput").value;
        saveRange(rangeName, categoryName, 'player1')
        $(modal).modal("hide");
    })
}

function getRange() {
    let chosenCombos = []
    for (const cell of comboCells) {
        if (cell.classList.contains('highlight-button')) {
            const combo = JSON.parse(cell.dataset.combo)
            chosenCombos.push(combo)
        }
    }
    return chosenCombos
}

function saveRange(rangeName, categoryName, player) {
    const range = getRange()
    currentRanges.player1 = getRange()
    const rangeObject = {
        name: rangeName,
        category: categoryName,
        range: range,
        class: 'savedRanges'
    };
    localStorage.setItem(rangeName, JSON.stringify(rangeObject))
    comboCells.forEach(cell => {
        cell.classList.remove('highlight-button')
    })
    createListElement(rangeName, categoryName, player)
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
    if (categoryName === 'openRaises') openRaisesRangesList.appendChild(li)
    else if (categoryName === 'threeBets') threeBetsRangesList.appendChild(li)
    else if (categoryName === 'defenses') defensesRangesList.appendChild(li)
}

function displaySavedRanges(className, player) {
    const savedRanges = Object.entries(localStorage).map(([key, value]) => JSON.parse(value)).filter(item => item && item.class === className);
    for (const range of savedRanges) {
        createListElement(range.name, range.category, player)
    }
}

function removeItemsByClass(className) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const item = JSON.parse(localStorage.getItem(key));
        if (item && item.class === className) {
            localStorage.removeItem(key);
            i--; // Decrement i to account for the removed item
        }
    }
}

const className = 'savedRanges';



//removeItemsByClass(className);
