const config = require('./config')
const express = require('express')
const app = express()

app.use(express.json())

var echoRouter = require('./routes/echo');
var translateRouter = require('./routes/translate')

app.use('/echo',echoRouter)

app.use('/',translateRouter)

app.listen(config.app.port, () => console.log(`api translator app listening at http://localhost:${config.app.port}`))