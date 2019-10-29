const express = require('express');
const router = express.Router();


// Require controller modules.
const device_controller = require('../controllers/deviceController');

// router.get('/:id', device_controller.getDeviceStreamUrl)
router.post('/streamurl', device_controller.device_streamurl_post)


module.exports = router;    