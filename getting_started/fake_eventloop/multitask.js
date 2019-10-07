process.env.UV_THREADPOOL_SIZE = 1 //tells libuv to create only two threads

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

const start = Date.now();
function doRequest(){
    https.request('https://www.google.com',res => {
        res.on('data',() => {});
        res.on('end',() => {
            console.log(Date.now() - start);
        });
    }).end();    
};

doRequest();

function doHash(){
    crypto.pbkdf2('a','b',10000 , 512, 'sha512',() =>{
        console.log("Hash:",Date.now() - start);
    });
}

fs.readFile('multitask.js','utf-8',() => {
    console.log('FS:',Date.now()-start);
});

doHash();
doHash();
doHash();
doHash();