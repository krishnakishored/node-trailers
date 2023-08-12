const cluster = require('cluster');

if (cluster.isMaster) {
    const numCPUs = require('os').cpus().length
    // If it's the master process, it will fork a new worker process for each core on the machine.
    console.log(`Master ${process.pid} is running`)

    // Fork workers for each core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    // The master process listens for an 'exit' event to know if a worker has died, and you can choose to restart it if needed.
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
    })
}
else {

    const express = require('express');
    const app = express();
    const port = 3000;
    const doSomeWork = (duration) => {
        const start = Date.now();
        while (Date.now() - start < duration) {
            // do nothing
        }
    }

    app.get('/', (req, res) => {
        doSomeWork(5000);
        res.send('Hello World!');
    })

    app.get('/fast', (req, res) => {
        res.send('This was fast!');
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}


