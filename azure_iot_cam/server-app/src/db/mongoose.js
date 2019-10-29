const mongoose = require("mongoose")
const config = require('../config')


//Set up mongoose connection
mongoose.connect(config.db.host, {useUnifiedTopology: true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// mongoose.connect("mongodb://127.0.0.1:27017/inseego5g360db", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// })
