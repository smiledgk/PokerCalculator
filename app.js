const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();



app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('calculator.ejs')
})

app.get('/calculator', (req, res) => {
    //test github
    res.render('new.ejs')
})


app.listen(3000, () => {
    console.log('Listening on Port 3000!!')
})