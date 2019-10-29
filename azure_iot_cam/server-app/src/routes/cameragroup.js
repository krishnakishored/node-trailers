const express = require('express');
const router = express.Router();


// Require controller modules.
const cameragroup_controller = require('../controllers/cameragroupController');

router.get('/members',cameragroup_controller.cameragroup_membercameras_get)
router.post('/',cameragroup_controller.cameragroup_create_post )
router.get('/', cameragroup_controller.cameragroup_list_get)/* GET cameragroups listing. */
router.get('/:id',cameragroup_controller.cameragroup_by_id_get)/* GET cameragroup by Id */



module.exports = router;

// ----------------------------------------------------------------------------
