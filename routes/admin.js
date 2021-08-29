const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin');

router.get('/orderList',adminControllers.customerOrderList);
router.get('/deliverPersonList',adminControllers.deliverBoyList);
router.put('/orderAssign',adminControllers.assignDeliveryPersonToOrder);

module.exports = router;