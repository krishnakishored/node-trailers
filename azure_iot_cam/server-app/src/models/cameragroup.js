const mongoose = require('mongoose');
const Camera = require('../models/camera')
const Schema = mongoose.Schema;

var CameraGroupSchema = new Schema(
  {
    // camera_id:  Schema.Types.ObjectId,
    cameragroup_name: {type: String, required: true, max: 50},
    registered_user_name: {type: String, required: true, maxlength: 50,trim:true},

  }, {toJSON: { virtuals: true },toObject:{virtuals:true}}
);

CameraGroupSchema.virtual('membercameras',{
  ref:'Camera', // the model to use
  localField:'cameragroup_name',
  foreignField:'registered_cameragroup_name',
    // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne:false,
  options: { sort: { name: -1 }, limit: 10 }
})

//Export model
module.exports = mongoose.model('Cameragroup', CameraGroupSchema);



// //-----------------------------------------------------------------------------
// //Creating the camera group table
// module.exports = (sequelize, DataTypes) => {
//     var cameragroup = sequelize.define('cameragroup', {
//         cameragroup_id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: DataTypes.INTEGER
//       },
//       cameragroup_name: DataTypes.STRING(50),
//     }, {});
//     return cameragroup;
//   };