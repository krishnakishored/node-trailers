const Cameragroup = require('../models/cameragroup');


// Handle Cameragroup create on POST.
const cameragroup_create_post = async (req, res) => {
  const cameragroup = new Cameragroup(req.body)
  try {
        await cameragroup.save()
        res.status(201).send({ cameragroup })
    } catch (e) {
        res.status(500).send(e)
    }
}

// Display list of all cameragroups.
const cameragroup_list_get = async (req, res) => {
  try{
    await Cameragroup.find()
    .sort([['cameragroup_name', 'ascending']])
    .exec((err,list_cameragroups)=>{
      if(err)
        return next(err)
      res.send(list_cameragroups)
    })
  }
  catch (e){
    res.status(400).send(e)
  }
}

const cameragroup_by_id_get= async(req, res) => {
 try{
   await Cameragroup.findById(req.params.id).exec((err,cameragroup)=>{
     if(err)
        return next(err)
      res.status(200).send(cameragroup)
   })
 }
 catch(e){
  res.status(400).send(e)
 }
}

const cameragroup_membercameras_get = async (req, res) => {
  
  try{
    await Cameragroup.findOne({cameragroup_name:req.body.cameragroup_name})
    .populate('membercameras')
    .exec((err,membercam_list)=>{
      if(err)
        return next(err)
      // res.send(membercam_list.membercameras)
      res.json(membercam_list)
    })
  }
  catch (e){
    res.status(400).send(e)
  }
}




module.exports = {
  cameragroup_create_post,
  cameragroup_by_id_get,  
  cameragroup_list_get,
  cameragroup_membercameras_get
}