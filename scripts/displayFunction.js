import { ranks, suits } from './helperVariables.js'
    for (let i = 14; i >= 2; i--){
        const row = document.createElement('div')
        row.classList.add('card-row')
        row.id = ranks[i - 2]
        for(let suit of suits) {
            const card = document.createElement('div')
            const button = document.createElement('button')
            card.classList.add('choiceCard')
            const img = document.createElement('img')
            img.setAttribute('src', `../Files/Cards/${ranks[i - 2].toLowerCase()}_of_${suit.toLowerCase()}.png`)
            button.setAttribute('id', `${ranks[i - 2].toLowerCase()}_of_${suit.toLowerCase()}`)
            card.setAttribute('id', `${ranks[i - 2].toLowerCase()}_of_${suit.toLowerCase()}`)
            img.setAttribute('width', '45px')
            button.appendChild(img)
            card.appendChild(button)
            row.appendChild(card)
        }
        document.querySelector('.cardForChoice').appendChild(row)
}
