const { Spot } = require('@binance/connector')
const lodash = require('lodash')

const apiKey = 'B4esgeVKmdvDv2l1vXAnND6twRbi6H22OtVkd62N68pPCnydurqFQ3bCSfO6CLVs'
const apiSecret = 'N1rrd73PbRbn892MnOYGNSwVnhEwnK2BjtH8sKlGIvcmTsZIm4PdzPu17hWItH23'
// provide the testnet base url
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})

/**
 * 开启交易
 * @returns {Promise<*>}
 */
const startTrade = async () => {
    try {
        // 买入一笔订单
        const result = await client.newOrder('ethusdt', 'BUY', 'MARKET', {
            quoteOrderQty: 10,
            timestamp: Date.now(),
        })
        // 拿到买入的最大价格
        let topPrice = 0;
        let total = 0
        result.data.fills.forEach(item => {
            if (item.price > topPrice) {
                topPrice = item.price
                total += item.qty
            }
        })
        // 发起一笔卖出订单
        const stopPrice = lodash.round(lodash.multiply(topPrice, 1.002), 2)
        const price = lodash.round(lodash.multiply(stopPrice, 1.002), 2)
        const r = await client.newOrder('ethusdt', 'SELL', 'TAKE_PROFIT_LIMIT', {
            stopPrice,
            price,
            quantity: total,
            timeInForce: 'GTC'
        })
        return r
    } catch (e) {
        throw e
    }

    // 获得当前价格
    // await client.exchangeInfo({ symbol: 'ethusdt' }).then(response => client.logger.log(response.data))
}

/**
 * 获取账户信息
 * @returns {Promise<*>}
 */
const getAccountInfo = async () => {
    return client.account()
}

/**
 * 获取交易对信息
 */
const getExchangeInfo = async () => {
    return client.exchangeInfo({ symbol: 'ethusdt' })
}

module.exports = {
    getAccountInfo,
    startTrade,
    getExchangeInfo
}

// Place a new order
// client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
//     price: '350',
//     quantity: 1,
//     timeInForce: 'GTC'
// }).then(response => client.logger.log(response.data))
//     .catch(error => client.logger.error(error))