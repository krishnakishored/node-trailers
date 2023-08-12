const config = require('./config')
const express = require('express')

const swaggerUi = require('swagger-ui-express');


const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const geojsonRouter = require('./routes/geojsonRouter')


app.use('/geojson',geojsonRouter)



app.all('/', (req, res) => res.json({
    "status":"All OK",
    "message":"use /gatekeeper path for some real work!",
    'method': req.method
}))


app.listen(config.app.port, () => console.log(`listening at http://localhost:${config.app.port}`))