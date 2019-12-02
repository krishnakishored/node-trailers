process.env.UV_THREADPOOL_SIZE = 1 // doesn't restrict the total no.of threads in the cluster. 
// It means every child in the cluster has only one thread

const cluster = require('cluster')

// console.log(cluster.isMaster)

if(cluster.isMaster){
    cluster.fork() // cause index.js to be executed 'again' in child mode
    // cluster.fork() 
    // cluster.fork() 
    // cluster.fork() 
}
else {

    const express = require('express')
    const crypto = require('crypto')
    const app = express()

    function doWork(duration) {
        const start = Date.now()
        while (Date.now() - start < duration) {}
    }

    app.get('/', (req, res) => {
        // doWork(5000) // event loop gets blocked for 5 sec
        // res.send('Hello World')
        crypto.pbkdf2('a','b',10000,512,'sha512',()=>{
            // console.log ('1:',Date.now() - start)
            res.send('Hello World')
        })
       
    })

    app.get('/fast',(req,res)=>{
        res.send('This is fast')
    })


    app.listen(3000, () => {
        console.log("App listening on 3000")
    })
}

