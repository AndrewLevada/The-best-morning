const weather   = require('weather-js');
const translate = require("./translate.js");

exports.get = async (country, city) => {
    return new Promise((resolve, reject) => {
        try {
            weather.find({
                search: `${country}, ${city}`,
                degreeType: 'C'
            }, async function (err, result) {
                if (err) resolve("Погода очень непонятная. ");
    
                let data = result[0].current;
                let text = "";
                try {
                    text += (await translate.toRussian(data.skytext + " weather")).toString().match(/(.*) погода/i)[1] + ". ";
                } catch (e) {
                    text += (await translate.toRussian(data.skytext + " weather")).toString() + ". ";
                }
                text += `Температура ${data.temperature}°. `;
                resolve(text);
            });
        } catch (e) {
            resolve("Погода очень непонятная. ");
        }
    });
};

exports.getTimeZone = async (country, city) => {
    return new Promise((resolve, reject) => {
        try {
            weather.find({
                search: `${country}, ${city}`,
                degreeType: 'C'
            }, async function (err, result) {
                if (err) resolve("failed");
    
                resolve(result[0].location.timezone);
            });
        } catch (e) {
            resolve("failed");
        }
    });
};