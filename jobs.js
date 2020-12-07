const axios = require('axios');

const getPrices = async function () {
    const COINGECKO_API = process.env.COINGECKO_API;
    const BINANCE_API = process.env.BINANCE_API;

    console.log(`Calling ${COINGECKO_API} for eth price`)

    // Get coingecko ETH vs USD price
    try {
        const res = await axios.get(COINGECKO_API);
        const { ethereum } = res.data;
        const obj = {
            usd: parseFloat(ethereum.usd).toFixed(2),
            time: new Date().toGMTString(),
            platform: "COINGECKO"
        }
        console.log(obj);
    } catch (err) {
        console.log(err);
    }

    // Get binance ETH vs USD price
    console.log(`Calling ${BINANCE_API} for eth price`);
    try {
        const res = await axios.get(BINANCE_API)
        // console.log(res.data)
        const obj = {
            usd: parseFloat(res.data['price']).toFixed(2),
            time: new Date().toGMTString(),
            platform: "BINANCE"
        }
        console.log(obj);
    } catch (err) {
        console.log(err)
    }
}

module.exports.getPrices = getPrices;