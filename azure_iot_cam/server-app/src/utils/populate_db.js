#! /usr/bin/env node

console.log('This script drops the existing collections, creates new ones and populates them');
//Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true

//mongodb+srv://mozilla-user-1:mozilla-user-1@cluster0-izhev.mongodb.net/local_library?retryWrites=true&w=majority
// Get arguments passed on command line
var config = require('../config')

var userArgs = process.argv.slice(2) 
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('../models/user')
var Cameragroup = require('../models/cameragroup')
var Camera = require('../models/camera')

// var CameraUser = require('../models/camerauser')
// var Role = require('../models/role')


const mongoose = require('mongoose');
var mongoDB = userArgs[0] || config.db.host;
mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var cameras = []
var cameragroups = []
// var camerausers = []
// var roles = []

// ------------ User Data -------------------------------------------------//
function userCreate(user_name, user_password,user_role_id,user_role_name,cb) {
    userdetail = {user_name, user_password,user_role_id,user_role_name}
    var user = new User(userdetail);
         
    user.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New user: ' + user);
      users.push(user)
      cb(null, user)
    });
}
function populateUser(cb) {
    async.series([
        function(callback) {
          userCreate('Srinath', 'Srinath',1,"admin", callback);
        },
        function(callback) {
            userCreate('Kishore', 'Kishore',2,"user", callback);
        },
        function(callback) {
            userCreate('Tarani', 'Tarani',2,"user", callback);
        },
        function(callback) {
            userCreate('Amzad', 'Amzad',1,"admin", callback);
        }        
        ],
        // optional callback
        cb);
}
// ------------ Cameragroup Data -------------------------------------------------//  
function cameragroupCreate(cameragroup_name, registered_user_name, cb) {
    cameragroupdetail = {cameragroup_name, registered_user_name }
    var cameragroup = new Cameragroup(cameragroupdetail);
         
    cameragroup.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New cameragroup: ' + cameragroup);
      cameragroups.push(cameragroup)
      cb(null, cameragroup)
    });
  }
  
  function populateCameragroup(cb) {
      async.series([
          function(callback) {
            cameragroupCreate('Golconda','Srinath', callback);
          },
          function(callback) {
            cameragroupCreate('Banjara Hills','Srinath', callback);
          },
          function(callback) {
            cameragroupCreate('Hitech City', 'Kishore', callback);
          },
          function(callback) {
            cameragroupCreate('KPHB', 'Tarani', callback);
          },
          function(callback) {
            cameragroupCreate('Miyapur', 'Tarani', callback);
          }
          ],
          // optional callback
          cb);
  }
  
// ------------ Camera Data -------------------------------------------------//
function cameraCreate(camera_name, registered_cameragroup_name,registered_user_name, cb) {
  cameradetail = {camera_name, registered_cameragroup_name,registered_user_name }
  var camera = new Camera(cameradetail);
       
  camera.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New camera: ' + camera);
    cameras.push(camera)
    cb(null, camera)
  });
}

function populateCamera(cb) {
    async.series([
        function(callback) {
          cameraCreate('AICam01', 'Golconda','Srinath', callback);
        },
        function(callback) {
            cameraCreate('AICam02', 'Golconda','Srinath', callback);
        },
        function(callback) {
            cameraCreate('AICam03', 'Miyapur','Tarani', callback);
        },
        function(callback) {
            cameraCreate('AICam04', 'Hitech City','Kishore', callback);
        },
        function(callback) {
            cameraCreate('AICam05', 'Hitech City', 'Kishore', callback);
        }
        ],
        // optional callback
        cb);
}
//------- Cleanup existing data -----------------------------------------------

async function deleteExistingCollections(){
  const res = {}
  res.cameragroups = await Cameragroup.deleteMany({});
  res.cameras = await Camera.deleteMany({});
  res.users = await User.deleteMany({});
  console.log("Existing data is deleted:")
  console.log(res)

}

//-----------------------------------------------------------------------------


async.series([
    deleteExistingCollections,
    populateUser,
    populateCameragroup,
    populateCamera
],

// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        // console.log('BOOKInstances: '+bookinstances);
        console.log("The following collections are populated - cameras, cameragroups, users")
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});


//-----------------------------------------------------------------------------