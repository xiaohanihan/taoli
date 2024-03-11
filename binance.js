const { Spot } = require('@binance/connector')

const apiKey = 'B4esgeVKmdvDv2l1vXAnND6twRbi6H22OtVkd62N68pPCnydurqFQ3bCSfO6CLVs'
const apiSecret = 'N1rrd73PbRbn892MnOYGNSwVnhEwnK2BjtH8sKlGIvcmTsZIm4PdzPu17hWItH23'
// provide the testnet base url
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})

const getAccountInfo = async () => {
   return  client.account().then(response => client.logger.log(response.data))
}

const startTrade = async () => {
    // 发起一笔交易
    // 获得当前价格
    await client.exchangeInfo({ symbol: 'ethusdt' }).then(response => client.logger.log(response.data))
}

module.exports = {
    getAccountInfo,
    startTrade
}

// Place a new order
// client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
//     price: '350',
//     quantity: 1,
//     timeInForce: 'GTC'
// }).then(response => client.logger.log(response.data))
//     .catch(error => client.logger.error(error))