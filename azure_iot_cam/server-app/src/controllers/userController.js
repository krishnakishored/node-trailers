const User = require('../models/user');

const user_create_post = async (req,res)=> {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send({ user })
  } catch (e) {
    res.status(400).send(e)
  }
}

// Display list of all Users.
const user_list_get = async (req, res) => {
  try{
    await User.find()
    .sort([['user_name', 'ascending']])
    .exec((err,list_users)=>{
      if(err)
        return next(err)
      res.send(list_users)
    })
  }
  catch (e){
    res.status(400).send(e)
  }
}

const user_by_id_get= async(req, res) => {
  try{
    await User.findById(req.params.id).exec((err,user)=>{
      if(err)
         return next(err)
       res.status(200).send(user)
    })
  }
  catch(e){
   res.status(400).send(e)
  }
 }


const user_membercameragroups_get = async (req, res) => {
  try{
    await User.findOne({user_name:req.body.user_name})
    // await User.find({user_name:req.body.user_name})
    .populate('membercameragroups')
    .exec((err,membercamgroup_list)=>{      
      if(err)
        return next(err)
      // res.send(membercamgroup_list.membercameragroups) //crash - reading null
      res.json(membercamgroup_list)
    })
  }
  catch (e){
    res.status(400).send(e)
  }
}



 module.exports = {
  user_create_post,
  user_by_id_get,
  user_list_get,
  user_membercameragroups_get
}