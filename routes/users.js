var express = require('express');
var router = express.Router();

const userControllers = require('../controllers/users'); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp',userControllers.signUp);
router.post('/logIn',userControllers.logIn);

module.exports = router;