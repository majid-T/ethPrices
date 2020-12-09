const axios = require('axios');
const { logData } = require('./logService');
const getPrices = async function () {
    const COINGECKO_API = process.env.COINGECKO_API;
    const BINANCE_API = process.env.BINANCE_API;
    const writeObj = {
        datetime: new Date().toGMTString(),
        datetimeNumber: Date.now()
    }


    console.log(`Calling ${COINGECKO_API} for eth price`)
    // Get coingecko ETH vs USD price
    try {
        const res = await axios.get(COINGECKO_API);
        const { ethereum } = res.data;
        writeObj.coinGecko = parseFloat(ethereum.usd).toFixed(2);
    } catch (err) {
        console.log(err);
    }

    // Get binance ETH vs USD price
    console.log(`Calling ${BINANCE_API} for eth price`);
    try {
        const res = await axios.get(BINANCE_API)
        writeObj.binance = parseFloat(res.data['price']).toFixed(2);
    } catch (err) {
        console.log(err)
    }

    // console.log(`Writing ${writeObj}`)
    logData(writeObj)
}

module.exports.getPrices = getPrices;