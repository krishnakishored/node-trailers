const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Cameragroup = require('../models/cameragroup')

const Schema = mongoose.Schema;

var UserSchema = new Schema(
  { 
    user_name: {type: String, required: true, maxlength: 50,trim:true},
    user_password: {type: String, required: true, maxlength: 50,trim:true},
    user_role_id: {type: Number, max: 10, default:2},
    user_role_name: {type: String, max: 100},
   // user_id: {type: Number,required:true},    
  }, { toJSON: { virtuals: true },toObject:{virtuals:true}}
);

/**
 * virtuals are not included in toJSON() output by default. 
 * If you want populate virtuals to show up when using functions that rely on JSON.stringify(), like Express' res.json() function, 
 * set the {virtuals: true} option on your schema's toJSON options.
 */

UserSchema.virtual('membercameragroups',{
  ref:'Cameragroup', // the model to use
  localField:'user_name',
  foreignField:'registered_user_name',
    // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne:false,
  options: { sort: { name: -1 }, limit: 5 }

})


//do not use arrow fn. as they don't bind to 'this' 
// middleware
// UserSchema.pre('save',function(next){
//   const user = this
//   if (user.isModified('password')) {
//     // user.password = await bcrypt.hash(user.password, 8)
//     bcrypt.hash(user.password,8).then((hashed_password)=>{
//       user.password = hashed_password
//     })
//   }
//   console.log("just before saving")
//   next()
// })

module.exports= mongoose.model('User',UserSchema)
