// API KEY: 0BSNGA5PV8BOVQ5W
const express = require("express");
const {connectDB, URL} = require("./db/Connection");
const {userPost,  userEmailGet} = require("./api/User")
const fetch = require("cross-fetch");
const app = express();
const cors = require("cors");
const port = process.env.Port || 9000;

connectDB();

const test =
  "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=0BSNGA5PV8BOVQ5W";
const demoDaily =
  "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo";
const demoMonthly =
  "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo";
app.use(cors());
app.use(express.json({extended:false}))
app.use("/api/userModel", userPost)//mongo User model
app.use("/api/userEmail", userEmailGet)


app.get("/api/globalquote", (req, res)=>{
  let uri = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.headers.symbol}&apikey=0BSNGA5PV8BOVQ5W`
  if (req.headers.symbol === "demo") {
    uri = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo"
  }
  fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.headers.symbol}&apikey=0BSNGA5PV8BOVQ5W`)
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
})

app.get("/api/", (req, res) => {  
  console.log(req.headers);  
  let uri = `https://www.alphavantage.co/query?function=${req.headers.timeselected}&symbol=${req.headers.symbol}${req.headers.timeselected === "TIME_SERIES_INTRADAY" ? "&interval=15min" : ''}&apikey=0BSNGA5PV8BOVQ5W`
  if(req.headers.symbol === "demo"){
    uri = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=demo"
  }
  fetch(uri)
    .then(res => {
      if (res.status >= 400) {
        return res.json()
        // throw new Error("Bad response from server");
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

app.get("/api/symbol", (req, res) => {
  const symbol = req.headers.symbol;  
  fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=0BSNGA5PV8BOVQ5W`
  )
    .then(res => {
      if (res.status >= 400) {
        // throw new Error("Bad response from server");        
        return res.json();
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

app.listen(port, () => console.log("Starting..."));
