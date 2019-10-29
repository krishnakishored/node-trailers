//Placeholder for now
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Welcome to Login Page")
    // res.redirect('users')
})


module.exports = router