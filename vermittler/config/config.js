require('dotenv').config()

const config = {
    app: {
        NAME: process.env.NAME || "vermittler",
        PORT: process.env.PORT || 3000,
        INSTANCE_COUNT: process.env.INSTANCE_COUNT || 1,
        DEBUG: process.env.DEBUG || "express"
    },
    db:{
        DB_HOST: process.env.DB_HOST || "localhost",
        DB_PORT: process.env.DB_PORT || 27017,
        DB_NAME: process.env.DB_NAME || "vermittler",
        DB_USER: process.env.DB_USER || "vermittler",
        DB_PASS: process.env.DB_PASS || "vermittler"
    }
}

module.exports = config