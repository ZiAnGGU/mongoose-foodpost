const Foodpost = require('../models/foodpost');

module.exports = {
    new: newFoodpost, // give it a newFoodpost function 
}
// in our router we have router.get('/new', foodpostsCtrl.new) we expected to call its new

// then we need to define the newFoodpost function here
function newFoodpost (req, res) {
    res.render('foodposts/new')
    // view page foodposts/new
};