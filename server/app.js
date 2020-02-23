// API KEY: 0BSNGA5PV8BOVQ5W
const express = require("express");
const fetch = require("cross-fetch");
const app = express();
const cors = require("cors");
const port = 9000;

const test =
  "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=0BSNGA5PV8BOVQ5W";
const demoDaily =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo";
const demoMonthly =
  "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo";
app.use(cors());
app.get("/api/", (req, res) => {
  //   console.log(timeSelected);
  console.log(req.headers);
  // req.headers.symbol
  // req.headers.timeSelected
  fetch(
    `https://www.alphavantage.co/query?function=${req.headers.timeselected}&symbol=${req.headers.symbol}&apikey=demo`
  )
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.error(err);
    });
});
// app.get('/api/', (req, res) => {
//     const header = req.headers
//     res.send(header)
// })
app.get("/api/symbol", (req, res) => {
  const symbol = req.headers.symbol;
  //https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=sony&apikey=demo
  fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=demo`
  )
    .then(res => {
      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }
      return res.json();
    })
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.error(err);
    });
});

// let test =  fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=0BSNGA5PV8BOVQ5W')
//             .then(res => {
//                 if (res.status >= 400) {
//                 throw new Error("Bad response from server");
//                 }
//                 return res.json();
//             })
//             .then(response => {
//                 console.log(response);
//             })
//             .catch(err => {
//                 console.error(err);
//             });

// app.listen(port, () => console.log(`Stocky listening on port ${port}!`))
app.listen(port, () => console.log("test"));
