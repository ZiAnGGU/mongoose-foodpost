var express = require('express');
var router = express.Router();
const foodpostsCtrl = require('../controllers/foodposts');
// NEW 
// const foodPostController = require('../controllers/foodPostCtrl'); 
// const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('New page');
// });


// GET /foodposts
router.get('/', foodpostsCtrl.index)
router.get('/new', foodpostsCtrl.new)
router.post('/', foodpostsCtrl.create);
router.get('/:id', foodpostsCtrl.show);
router.delete('/:id', foodpostsCtrl.delete);
router.post('/:id/reviews', foodpostsCtrl.addReview);

//new code for deleting review inside of the details
// router.delete('/foodposts/:id', foodpostsCtrl.delete);
router.delete('/:foodpostId/reviews/:reviewId', foodpostsCtrl.deleteReview);

// NEW
// router.delete('/foodposts/:foodpostId/reviews/:reviewId', foodPostCtrl.deleteReview);
module.exports = router;
