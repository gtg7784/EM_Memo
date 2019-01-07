const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000

mongoose.connect("mongodb://em_memo:em_memo1@ds255403.mlab.com:55403/em_memo", { useNewUrlParser: true }).then(
    () => { console.log('DataBase is connected'); } ,
    err => { console.log('Check DB - Connection error : '); }
)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))