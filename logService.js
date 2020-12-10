const fs = require('fs');
const fileName = () => {
    let d = new Date(Date.now()).toISOString()
    return d.split("T")[0];
}
const logData = (_obj) => {

    try {
        let jsonArray;

        //Check the 
        if (fs.existsSync(`.\\prices\\${fileName()}.json`)) {
            fs.readFile(`.\\prices\\${fileName()}.json`, (err, data) => {
                jsonArray = JSON.parse(data);
                jsonArray.push(_obj);
                fs.writeFile(`.\\prices\\${fileName()}.json`, JSON.stringify(jsonArray), function (err) {
                    if (err) throw err;
                });
            });
        } else {
            fs.writeFile(`.\\prices\\${fileName()}.json`, "[]", () => console.log("Making new File"))
            jsonArray = [];
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports.logData = logData;