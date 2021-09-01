require('dotenv').config();
const request = require('request');
const { parseAsync } = require('json2csv');
const writeCsv = require('./utils/write-csv');
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key

const alphaFunction = 'TIME_SERIES_DAILY';
const alphaSymbol = 'IBM';
const url = `https://www.alphavantage.co/query?function=${alphaFunction}&symbol=${alphaSymbol}&apikey=${process.env.API_KEY}`;

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
    // data is successfully parsed as a JSON object:
    const object = data["Time Series (Daily)"];

    const csvData = [];

    for (const key in object) {
      csvData.push(
        { symbol: alphaSymbol, 'date': key, ...object[key] }
      );
    }

    console.log(csvData);


    parseAsync(csvData)
      .then(csv => {
        writeCsv(csv)
          .then(res => console.log(res.message))
          .catch(err => console.log(err));
      });
  }
});

