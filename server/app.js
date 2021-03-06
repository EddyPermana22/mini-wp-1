'use strict'

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const port = process.env.PORT || 3000

const app = express()

const router = require('./router')
const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => console.log('failed to connect Database', err))

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: `Server Ready`
    })
})

app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log(`listening on port ${port} `))