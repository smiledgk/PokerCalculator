function chosenUserCombinations(chosenRange) {
    let resultCombos = []
    chosenRange.forEach(combo => {
        combo.combinations.forEach(cards => {
            resultCombos.push({
                markup: combo.markup,
                cards: cards
            })
        })
    })
    return resultCombos
}

export { chosenUserCombinations }