// API KEY: 0BSNGA5PV8BOVQ5W
const express = require('express')
const fetch = require('cross-fetch')
const app = express()
const cors = require("cors");
const port = 9000

const demo = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo"
const test = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=0BSNGA5PV8BOVQ5W'
const demo2 = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo"
app.use(cors())

app.get('/', (req, res) => {
    fetch(demo2)
            .then(res => {
                if (res.status >= 400) {
                throw new Error("Bad response from server");
                }
                return res.json();
            })
            .then(response => {
                
                res.send(response)
            })
            .catch(err => {
                console.error(err);
            });
    // res.send('Hello Stocky!')
})


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
app.listen(port, () => console.log("test"))