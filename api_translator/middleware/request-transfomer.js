// v1.0: v1.2 // mapping for the old and new fields
const req_field_mapper = { 
    "idDevice":"devid",
    "macaddr":"mac",
    "rssi":"rss"
}

const replaceAll = function (str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

// middleware that is specific to this router
const request_transformer = function(req,res,next){
    if (req.headers['content-type'].includes("json")){
        let updated_request_body = JSON.stringify(req.body)
        for (key in req_field_mapper){
            updated_request_body = replaceAll(updated_request_body,key,req_field_mapper[key])
        }
        // console.log(updated_request_body) 
        // req.body = updated_request_body
        req.body = JSON.parse(updated_request_body)    
    }
    // console.log(updated_request_body.replace('idDevice','devid'))
    next()
}

module.exports = request_transformer