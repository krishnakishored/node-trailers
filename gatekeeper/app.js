const config = require('./config')
const express = require('express')
const app = express()

app.use(express.json())

var gatekeeperRouter = require('./routes/gatekeeper')

app.use('/gatekeeper',gatekeeperRouter)

app.all('/', (req, res) => res.json({
    "status":"All OK",
    "message":"use /gatekeeper path for some real work!",
    'method': req.method
}))

app.listen(config.app.port, () => console.log(`listening at http://localhost:${config.app.port}`))