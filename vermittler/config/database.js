const config = require('./config');
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(config.db.DB_NAME, config.db.DB_USER, config.db.DB_PASS, {
    host: config.db.DB_HOST,
    dialect: 'postgres',
    port: config.db.DB_PORT,
    logging: console.log,
    // logging: false, // disable logging; default: console.log
    pool: { max: 5, min: 0, idle: 10000 }
    });



// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//     }).catch(err => {
//     console.error('Unable to connect to the database:', err);
//     }
//     );

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    }
    catch (error) {
    console.error('Unable to connect to the database:', error);
    }

// export sequelize object
module.exports = sequelize;    