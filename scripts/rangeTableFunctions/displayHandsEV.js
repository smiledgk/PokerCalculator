function displayEV(EVobject) {
    const winEV = EVobject.win
    const drawEV = EVobject.draw
    const loseEV = 100 - winEV - drawEV
    firstPlayerEVText.innerText = winEV.toFixed(2) + '%'
    drawEVText.innerText = drawEV.toFixed(2) + '%'
    secondPlayerEVText.innerText = loseEV.toFixed(2) + '%'
    if (winEV > loseEV) {
        firstPlayerEVText.style.color = 'green'
        secondPlayerEVText.style.color = 'red'
    } else if (winEV < loseEV) {
        firstPlayerEVText.style.color = 'red'
        secondPlayerEVText.style.color = 'green'
    } else drawEVText.style.color = 'green'
}

export { displayEV }