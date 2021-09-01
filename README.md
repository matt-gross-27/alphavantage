# alphavantage

## Description

Get times series data for stock tickers from alphavantage API and write the csv data to your computer!

## Installation
- install `node.js` and `npm` if you don't have already
- run `npm install` from the root directory

## Usage
- create a `.env` file at the root directory with 

```
API_KEY='your_key'
```

- enter 5 tickers in lib/myTickers file
```js
module.exports = [
  'IBM', 'AAPL', 'BA', 'ERJ'
]
```

- run the command `node index.js` from the root directory

- check the dist directory for csvs