const express = require('express');

const router = express.Router();

const userAuthentication = require('../middleware/auth')
const userController = require('../controllers/login')
const deliveryController = require('../controllers/delivery')


router.post('/user/login', userController.addUser)

router.post('/user/delivery-details', userAuthentication.authenticate, deliveryController.delivery)
router.get('/user/pickup-details', userAuthentication.authenticate, deliveryController.pickupDetails)
router.post('/user/update-pickup', userAuthentication.authenticate, deliveryController.pickup)



module.exports = router