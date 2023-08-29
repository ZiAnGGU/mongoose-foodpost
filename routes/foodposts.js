var express = require('express');
var router = express.Router();
const foodpostsCtrl = require('../controllers/foodposts');
//const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('New page');
// });


// GET /foodposts
router.get('/', foodpostsCtrl.index)
router.get('/new', foodpostsCtrl.new)


// router.post('/', foodpostsCtrl.create)

// once hit /foodpost, its being prefixed 
// from the router file its already /foodpost guide user here in this route
// controller created then go to controller define the foodpost controller

// router.get('/foodposts/:id', foodpostsCtrl.show)


module.exports = router;
