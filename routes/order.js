const express = require('express');
const router = express.Router();
const deliverControllers = require('../controllers/deliver');

router.put('/statusUpdate',deliverControllers.deliverStatus);

module.exports = router;