export const drawChart = () => {
    const data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 5],
        ['Commute', 3],
        ['Watch TV', 2],
        ['Sleep', 7]
    ]);
    const options = {
        title: 'My Daily Activities'
    };
    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

