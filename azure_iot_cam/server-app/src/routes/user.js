const express = require('express');
const user_controller = require('../controllers/userController')

const router = express.Router();

/* GET users listing. */

router.get('/members',user_controller.user_membercameragroups_get)
router.post('/', user_controller.user_create_post)
router.get('/', user_controller.user_list_get);
router.get('/:id', user_controller.user_by_id_get);
module.exports = router;
