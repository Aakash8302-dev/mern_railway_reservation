const express = require('express')
const {createTrain, getAllTrain, findStops, trainSearch} =require('../controllers/trainController.js')

const router = express.Router();

router.route('/').get(getAllTrain)
router.route('/create').post(createTrain);
router.route('/findstops').get(findStops);
router.route('/search/:from/:to').get(trainSearch)

module.exports = router

