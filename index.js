const express = require('express');
const bodyParser = require('body-parser');
const { getAccountInfo, startTrade } = require('./binance')

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    startTrade()
    res.send('Hello World!');
});
app.listen(3000, () => {
    console.log('Server started on port 3000');
});