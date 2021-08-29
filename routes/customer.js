const express = require('express');
const router = express.Router();

const customerControllers = require('../controllers/customers');

router.put('/order',customerControllers.cutomerOrder);

module.exports = router;