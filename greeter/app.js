const config = require('./config')
const express = require('express')
const app = express()

app.use(express.json())



var publicRouter = require('./routes/public')
var privateRouter = require('./routes/private')
var sharedRouter = require('./routes/shared')
var uploadRouter = require('./routes/upload')
// var translateRouter = require('./routes/translate')

app.use('/public',publicRouter)
app.use('/private',privateRouter)
app.use('/shared',sharedRouter) //ispace
// app.use('/ispace',groupRouter) //ispace
// app.use('/comtech',groupRouter) //comtech

app.use('/upload',uploadRouter)


app.all('/*', (req, res) => res.status(200).json({
    "greeting":"Hello from Final Handler !!!",
    'method': req.method,
    "headers":req.headers,
    "body":req.body,
    "urlpath": req.protocol + '://' + req.get('host') + req.originalUrl

}))    

app.listen(config.app.port, () => console.log(`greeter listenting at http://localhost:${config.app.port}`))