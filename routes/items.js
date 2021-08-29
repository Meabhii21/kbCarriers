const express=require('express');
const router =  express.Router();

const itemsControllers = require('../controllers/items');

router.put('/insert',itemsControllers.insertItems);

module.exports=router;