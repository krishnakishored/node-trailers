const express = require('express');
const router = express.Router();


// Require controller modules.
const camera_controller = require('../controllers/cameraController');

router.patch('/ams',camera_controller.camera_update_patch)
router.post('/',camera_controller.camera_create_post)
router.get('/', camera_controller.camera_list_get) /* GET Cameras listing. */
router.get('/:id',camera_controller.camera_by_id_get) /* GET Camera by Id */

module.exports = router;

// ----------------------------------------------------------------------------
