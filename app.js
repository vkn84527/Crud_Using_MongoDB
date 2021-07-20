const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/MongoDB_Test'

const app = express()

mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
const con = mongoose.connection

con.on('open', () => {
    console.log('DataBase connected...')
})

app.use(express.json())

const router = require('./routes/router')
app.use('/users', router)

app.listen(3000, () => {
    console.log('Server Running on port 3000')
})