const Foodpost = require('../models/foodpost');
const User = require('../models/user');


module.exports = {
    index,
    new: newFoodpost, // give it a newFoodpost function 
    create,
    show
}
// in our router we have router.get('/new', foodpostsCtrl.new) we expected to call its new

//original async index function:
// async function index(req, res) {
//     const foodpost = await Foodpost.find({});
//     res.render('foodposts/index', {name: 'All Posts', foodposts});
// };

async function index(req, res) {
  try {
      const foodposts = await Foodpost.find({});
      res.render('foodposts/index', { title: 'All Posts', foodposts });
  } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
  }
}

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
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;

  try {
      const foodpost = await Foodpost.create(req.body);
      res.redirect(`/foodposts/${foodpost._id}`);
  } catch (err) {
      console.log(err);
      res.status(500).render('foodposts/new', { errorMsg: 'try again.' });
  }
}

async function show(req, res) {
  try {
      const foodpost = await Foodpost.findById(req.params.id); // Removed populate('cast') as it wasn't clear what it was for
      res.render('foodposts/show', { foodpost });
  } catch (err) {
      console.log(err);
      res.status(500).send("error");
  }
}