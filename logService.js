const fs = require('fs');

const logData = (_obj) => {

    try {
        let jsonArray;

        //Check the 
        if (fs.existsSync('.\\prices\\prices.json')) {
            console.log("in here")
            fs.readFile('.\\prices\\prices.json', (err, data) => {
                jsonArray = JSON.parse(data);
                jsonArray.push(_obj);
                fs.writeFile(`.\\prices\\prices.json`, JSON.stringify(jsonArray), function (err) {
                    if (err) throw err;
                });
            });
        } else {
            fs.writeFile(".\\prices\\prices.json", "[]", () => console.log("Making new File"))
            jsonArray = [];
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports.logData = logData;