const config = require('./config/config');

module.exports = {
  apps : [{
    name: 'vermittler',
    script: './bin/www',
    watch: true,
    cwd:"./",
    ignore_watch: ["node_modules"],
    // instances: config.app.INSTANCE_COUNT, //"max" to use all cpu cores(4)
    "env": {
      "PORT": config.app.PORT,
      "DEBUG": "express"
    },
  }, 
  // {
  //   script: './service-worker/',
  //   watch: ['./service-worker']
  // }
],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
