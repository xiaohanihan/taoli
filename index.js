const express = require('express');
const bodyParser = require('body-parser');
const { getAccountInfo, startTrade, getExchangeInfo} = require('./binance')
const ResponseBody = require('./module/ResponseBody')
const {cloneWith} = require('lodash')

const app = express();
app.use(bodyParser.json());

app.get('/account', async (req, res) => {
    try {
        const result = await getAccountInfo()
        res.json(ResponseBody({data: result.data, message: 'success', status: result.status, code: 0}));
    } catch (e) {
        res.json(ResponseBody({data: null, message: e.message, status: 'failed', code: 200}))
    }
})

app.post('/trade', async (req, res) => {
    try {
        const result = await startTrade()
        res.json(ResponseBody({data: result.data, message: 'success', status: result.status, code: 0}));
    } catch (e) {
        res.json(ResponseBody({data: null, message: e.message, status: 'failed', code: 200}))
    }
});

app.get('/exchangeInfo', async (req, res) => {
    try {
        const result = await getExchangeInfo()
        res.json(ResponseBody({data: result.data, message: 'success', status: result.status, code: 0}));
    } catch (e) {
        res.json(ResponseBody({data: null, message: e.message, status: 'failed', code: 200}))
    }
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});