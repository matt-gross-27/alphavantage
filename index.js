require('dotenv').config();
const fs = require('fs');
const request = require('request');
const myTickers = require('./lib/myTickers')

const writeCsvs = async (symbolList) => {
  for await (const alphaSymbol of symbolList) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${alphaSymbol}&apikey=${process.env.API_KEY}&datatype=csv`;

    request.get({
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' }
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        console.log(data);
        fs.writeFileSync(`./dist/${alphaSymbol}.csv`, data);
      }
    });
  }
};

writeCsvs(myTickers);