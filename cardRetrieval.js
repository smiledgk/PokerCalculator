const idElements = [
    'Flop1', 'Flop2', 'Flop3', 'Turn', 'River',
    'FirstPlayerHand1', 'FirstPlayerHand2',
    'SecondPlayerHand1', 'SecondPlayerHand2']
    const getDomElementById = (id) => document.querySelector(`#${id}`);
const [flop1, flop2, flop3, turnC, riverC] = idElements.map(getDomElementById);

const cards = [
    { name: 'Flop1', card: flop1, isChosen: false, order: 5 },
    { name: 'Flop2', card: flop2, isChosen: false, order: 6 },
    { name: 'Flop3', card: flop3, isChosen: false, order: 7 },
    { name: 'Turn', card: turnC, isChosen: false, order: 8 },
    { name: 'River', card: riverC, isChosen: false, order: 9 }
];

export { cards }
