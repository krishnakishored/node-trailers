require('dotenv').config();


const port = process.env.PORT || 7777;
// console.log(`Your port is ${process.env.PORT}`); 
const upstream_url = process.env.UPSTREAM_URL
// const upstream_calculate_url = process.env.UPSTREAM_CALCULATE_URL

// console.log(`calc: ${upstream_calculate_url}, status: ${upstream_status_url}`)

const config = {
    app: {
      port,
      upstream_url,
    //   upstream_calculate_url
    },
};


module.exports=config