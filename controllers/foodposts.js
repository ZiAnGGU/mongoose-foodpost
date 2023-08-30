const Foodpost = require('../models/foodpost');
const User = require('../models/user');


module.exports = {
    index,
    new: newFoodpost, // give it a newFoodpost function 
    create,
    show,
    delete: deleteFoodpost,
    addReview,
    deleteReview
}
// in our router we have router.get('/new', foodpostsCtrl.new) we expected to call its new


async function index(req, res) {
  try {
      const foodposts = await Foodpost.find({});
      res.render('foodposts/index', { title: 'All Foodposts', foodposts });
  } catch (err) {
      console.log(err);
      res.status(500).send("An error occurred");
  }
}

// then we need to define the newFoodpost function here
function newFoodpost (req, res) {
    res.render('foodposts/new', {title: 'Add A Foodpost'});
    // view page foodposts/new
};


async function create(req, res) {
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
console.log(req.body)
  try {
      const foodpost = await Foodpost.create(req.body);
      res.redirect(`/foodposts`);
  } catch (err) {
      console.log(err);
      res.redirect('/foodposts/new');
  }
}

async function show(req, res) {
  try {
      const foodpost = await Foodpost.findById(req.params.id);
      res.render('foodposts/show', { foodpost, title: 'foodpost' });
  } catch (err) {
      console.log(err);
      res.redirect('/foodposts');
  }
}

async function deleteFoodpost(req, res) {
    try {
      const foodpost = await Foodpost.findById(req.params.id);
      if (foodpost.user.equals(req.user._id)) {
        await Foodpost.findByIdAndRemove(req.params.id);
        res.redirect('/foodposts');
      }
    } catch (err) {
      console.log(err);
      res.redirect('/foodposts');
    }
  }

async function addReview(req, res) {
    const foodpost = await Foodpost.findById(req.params.id);
  
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
  
    // We can push (or unshift) subdocs into Mongoose arrays
    foodpost.reviews.push(req.body);
    try {
      await foodpost.save();
    } catch (err) {
      console.log(err);
    }
    res.redirect(`/foodposts/${foodpost._id}`);
  }

  // new delete inside of detail
  async function deleteReview(req, res, next) {
    try {
      const foodpost = await Foodpost.findById(req.params.foodpostId);
      const reviewIndex = foodpost.reviews.findIndex(review => review._id.equals(req.params.reviewId));
      
      if (reviewIndex === -1) {
        return res.status(404).send("Review not found");
      }
  
      foodpost.reviews.splice(reviewIndex, 1);
      await foodpost.save();
  
      res.redirect(`/foodposts/${req.params.foodpostId}`);
    } catch (error) {
      next(error);
    }
  }
// NEW
//   exports.deleteReview = async (req, res, next) => {
//     try {
//       // Assuming review is a subdocument in the FoodPost model
//       const { foodpostId, reviewId } = req.params;
//       await FoodPost.findByIdAndUpdate(foodpostId, {
//         $pull: { reviews: {_id: reviewId} }
//       });
      
//       // If you have a separate Review model, you can also do:
//       // await Review.findByIdAndDelete(reviewId);
  
//       req.flash('success', 'Successfully deleted review.');
//       res.redirect(`/foodposts/${foodpostId}`);
//     } catch (error) {
//       req.flash('error', 'Could not delete review.');
//       res.redirect('back');
//     }
//   };