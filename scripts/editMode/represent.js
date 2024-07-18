const hightlightHand1 = document.querySelector('#Hand1')
const hightlightHand2 = document.querySelector('#Hand2')
const piechart = document.getElementById('piechart')

function highlightCards(player) {
    if (player === 'firstPlayer') {
        hightlightHand1.classList.add('highlighted')
        if (hightlightHand2.classList.contains('highlighted')) hightlightHand2.classList.remove('highlighted')
    }
    else if (player === 'secondPlayer') {
        hightlightHand2.classList.add('highlighted')
        if (hightlightHand1.classList.contains('highlighted')) hightlightHand1.classList.remove('highlighted')
    }
}

function removehighlightCards() {
    if (hightlightHand1.classList.contains('highlighted')) hightlightHand1.classList.remove('highlighted')
    if (hightlightHand2.classList.contains('highlighted')) hightlightHand2.classList.remove('highlighted')
}

function drawChart(comboArray) {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(function () {
        const dataArray = [['Combination', 'Odds of Getting']]
        for (let combo of comboArray) {
            if (parseInt(combo.odds) !== 0) dataArray.push([combo.name, parseInt(combo.odds)])
        }
        dataArray.forEach(data => {
            if (data[0] == 'High Card') data[0] = 'Nothing'
        })
        const data = google.visualization.arrayToDataTable(dataArray);
        const options = {
            title: 'Chances of Improving to the River',
            backgroundColor: '#f5f5f5',
            width: 600,
            height: 400,
            legend: { position: 'right', alignment: 'center', textStyle: { fontSize: 14 } },
            chartArea: { left: 50, top: 50, width: '75%', height: '75%' }
        };
        const chart = new google.visualization.PieChart(piechart);
        chart.draw(data, options);
    });
}

export { highlightCards, removehighlightCards, drawChart }
