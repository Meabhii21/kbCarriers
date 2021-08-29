const express = require('express');
const router = express.Router();

const categoryControllers = require('../controllers/category');

router.put('/insert',categoryControllers.insertCategory);

module.exports = router;