import { ranks, suits } from './helperVariables.js'
for (let suit of suits) {
    for (let i = 2; i <= 14; i++) {
        const card = document.createElement('div')
        const button = document.createElement('button')
        card.classList.add('choiceCard')
        const img = document.createElement('img')

        img.setAttribute('src', `../Files/Cards/${ranks[i - 2].toLowerCase()}_of_${suit.toLowerCase()}.png`)
        button.setAttribute('id', `${ranks[i - 2].toLowerCase()}_of_${suit.toLowerCase()}`)
        card.setAttribute('id', `${ranks[i - 2].toLowerCase()}_of_${suit.toLowerCase()}`)
        img.setAttribute('width', '50px')
        button.appendChild(img)
        card.appendChild(button)
        document.getElementById(suit).appendChild(card)
    }
}
