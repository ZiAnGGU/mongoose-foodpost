const Foodpost = require('../models/foodpost');


module.exports = {
    index,
    new: newFoodpost, // give it a newFoodpost function 
    create,
}
// in our router we have router.get('/new', foodpostsCtrl.new) we expected to call its new

async function index(req, res) {
    const foodpost = await Foodpost.find({});
    res.render('foodposts/index', {name: 'All Posts', foodposts});
};

// then we need to define the newFoodpost function here
function newFoodpost (req, res) {
    res.render('foodposts/new')
    // view page foodposts/new
};

// async function create(req, res) {
 //   console.log(req.body)
//     try {
//       const newFoodpost = new Foodpost(req.body);
//       await newFoodpost.save();
//       res.redirect('/');
//     } catch (err) {
//       console.error(err);
//       res.redirect('foodposts/new', {
//         title: 'Add Foodpost',
//         errors: err.errors
//       });
//     }
//   };

async function create(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key];
    }
    try {
      const foodpost = await Foodpost.create(req.body);
      res.redirect(`/foodposts/${foodpost._id}`);
    } catch (err) {
      console.log(err);
      res.render('foodposts/new', { errorMsg: err.message });
    }
  }