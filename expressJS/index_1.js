/*
Sample code for
    -  "Request Parameters",
    -  "Sending a response", 
    -   "Sending a JSON response"

*/
const express = require('express')
const app = express()

//use these middlewares based on data sent using POST
app.use(express.json()) // if data was sent as JSON using "Content-type:application/json"
// app.use(express.urlencoded()) // if data was sent as JSON using "Content-type:application/x-www-form-urlencoded"


// const chokidar = require('chokidar');
 
// // One-liner for current directory, ignores .dotfiles
// chokidar.watch('.', {ignored: /(^|[\/\\])\../}).on('all', (event, path) => {
//   console.log(event, path);
// });



app.get('/',(req,res)=>{
    for(key in req.query)
    console.log(key,req.query[key])
    res.send("Hello world!\n")
})


app.post('/form',(req,res)=>{
    const name = req.body.name
    // console.log(name)
    res.send("Your post is received: "+name)
})

app.get('/error',(req,res)=>{
     
    // res.status(404).end() // Use end() to send an empty response
    res.status(200).send('Alllizzzwell\n')
    //Shortcuts
    // res.sendStatus(200) //=== res.status(200).send('OK')
    // res.sendStatus(403) //=== res.status(403).send('Forbidden')
    // /res.sendStatus(404) //=== res.status(404).send('Not Found')
    // res.sendStatus(405) //=== res.status(405).send('Internal Server Error') or res.status(405).send('Method Not Allowed')
})

app.get('/time',(req,res)=>{
    const moment = new Date(Date.now())
    res.json({
        currentTime : moment
    })
})



app.listen(3000,()=>{
    console.log("Server is ready")
})




//sample curl commands 

//GET 
// curl "10.10.15.12:3000/?name=kk&age=20"

//POST a json 
// $ curl -X POST -H "Content-Type: application/json" -d @FILENAME DESTINATION
// curl -X POST -H "Content-Type: application/json" -d '{"name":"abcd"}' 10.10.15.12:3000/form   