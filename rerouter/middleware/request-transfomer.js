
const field_mapper = { // v1.0: v1.2
    "idDevice":"devid",
    "macaddr":"mac",
    "rssi":"rss"
}




// middleware that is specific to this router
const request_transformer = function(req,res,next){
    // // console.log(`${req.method} request from ${req.get('host')+req.originalUrl}  at ${Date(Date.now()).toString()}`)
    // let updated_request_body = JSON.stringify(req.body).replace(/\s/g, '')
    // for (key in field_mapper){
    //     const global_key = new RegExp(key, 'g');
    //     console.log(global_key)
    //     updated_request_body.replace(global_key,field_mapper[key]) // replace all instances of old fields
    //     // console.log(key,field_mapper[key])
    // }
    // // console.log(updated_request_body) 
    // req.body = JSON.parse(updated_request_body)

    
    req.body = {
        "devid": "Postman ILP Test Suite",
        "observations": {
            "observations": [
                {
                    "epoch": "{{time2}}",
                    "mac": [108,114,32,207,133,34],
                    "rss": 45,
                    "type": 14
                },
                {
                    "epoch": "{{time2}}",
                    "mac": [28,95,43,98,20,109],
                    "rss": 65,
                    "type": 14
                },
                {
                    "epoch": "{{time2}}",
                    "mac": [200,58,53,50,215,112],
                    "rss": 91,
                    "type": 14
                },
                {
                    "epoch": "{{time2}}",
                    "mac": [108,114,32,67,81,31],
                    "rss": 84,
                    "type": 14
                }
            ]
        }
    }
    
    // console.log(updated_request_body.replace('idDevice','devid'))
    next()
}

module.exports = request_transformer