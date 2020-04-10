const config = require('./config')
const express = require('express')
const app = express()

app.use(express.json())

var echoRouter = require('./routes/echo');
var redirectRouter = require('./routes/redirect')

app.use('/echo',echoRouter)

app.use('/',redirectRouter)

app.listen(config.app.port, () => console.log(`Rerouter app listening at http://localhost:${config.app.port}`))