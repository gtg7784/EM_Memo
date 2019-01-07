const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(
    () => { console.log('DataBase is connected'); } ,
    err => { console.log('Check DB - Connection error : '); }
)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))