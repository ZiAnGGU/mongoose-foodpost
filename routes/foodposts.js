var express = require('express');
var router = express.Router();
const foodpostsCtrl = require('../controllers/foodposts');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', foodpostsCtrl.new)
// once hit /foodpost, its being prefixed 
module.exports = router;
