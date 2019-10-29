var Camera = require('../models/camera');

// Handle Camera create on POST.
const camera_create_post = async (req, res) => {
  const camera = new Camera(req.body)
  try {
        await camera.save()
        res.status(201).send({ camera })
    } catch (e) {
        res.status(500).send(e)
    }
}

// Display list of all Cameras.
const camera_list_get = async (req, res) => {
  try{
    await Camera.find()
    .sort([['camera_name', 'ascending']])
    .exec((err,list_cameras)=>{
      if(err)
        return next(err)
      res.send(list_cameras)
    })
  }
  catch (e){
    res.status(400).send(e)
  }
}

const camera_by_id_get = async(req, res) => {
 try{
   await Camera.findById(req.params.id).exec((err,camera)=>{
     if(err)
        return next(err)
      res.status(200).send(camera)
   })
 }
 catch(e){
  res.status(400).send(e)
 }
}

/**
 * 
 
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})} req 
 
 */


// Populate the ams_resource array w.r.t camera_id
const camera_update_patch = async (req, res) => {
  //find camera byID & then update the ams resources
  try{
    await Camera.findById(req.body.camera_id).exec((err,camera)=>{
      if(err)
         return next(err)
      
      //add the sub-document to the camera
      camera.ams_resources.push(req.body.ams_resources)
      camera.save()
      res.status(201).send({ camera })
    })
  }
  catch(e){
   res.status(400).send(e)
  }

};

// Display Camera delete form on GET.
const camera_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Camera delete GET');
};

// Handle Camera delete on POST.
const camera_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Camera delete POST');
};

// Display Camera update form on GET.
const camera_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Camera update GET');
};



module.exports = {
  camera_create_post,
  camera_by_id_get,
  camera_update_patch,
  camera_list_get
}