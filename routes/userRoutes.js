const express = require('express');
const {register, test,login} = require('../controllers/userController.js')
const {protect} = require('../middlewares/authMiddleware')


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/test').get(test);

module.exports = router