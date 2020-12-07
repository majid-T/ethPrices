const getPrices = async function () {
    const COINGECKO_API = process.env.COINGECKO_API;
    const BINANCE_API = process.env.BINANCE_API;

    console.log("Running Task ....")
    console.log(`Calling ${COINGECKO_API} for eth price`)
    console.log(`Calling ${BINANCE_API} for eth price`)
}

module.exports.getPrices = getPrices;