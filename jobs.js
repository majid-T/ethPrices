const axios = require('axios');
const fs = require('fs');

const getPrices = async function () {
    const COINGECKO_API = process.env.COINGECKO_API;
    const BINANCE_API = process.env.BINANCE_API;
    const writeObj = {
        datetime: new Date().toGMTString(),
        datetimeNumber: Date.now()
    }

    let jsonArray = [];
    fs.readFile('.\\prices\\prices.json', (err, data) => {
        if (data) {
            jsonArray = JSON.parse(data);
            console.log(data.toString())
        } else {
            fs.writeFile(".\\prices\\prices.json", "[]", () => console.log("Making new File"))
        }
    })
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
        writeObj.coinGecko = parseFloat(ethereum.usd).toFixed(2);
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
        writeObj.binance = parseFloat(res.data['price']).toFixed(2);
    } catch (err) {
        console.log(err)
    }

    // console.log(`Writing ${writeObj}`)
    jsonArray.push(writeObj)
    fs.writeFile(`.\\prices\\prices.json`, JSON.stringify(jsonArray), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports.getPrices = getPrices;