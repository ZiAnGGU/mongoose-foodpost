const Foodpost = require('../models/foodpost')

module.exports = {
    delete: deleteReview,
    edit,
    update
};

async function deleteReview(req, res) {
    try {
        const foundFoodpost = await Foodpost.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id});
        
        if (!foundFoodpost) {
            return res.redirect('/foodposts');
        }
        foundFoodpost.reviews.remove(req.params.id);
         // Save the updated foodpost
        await foundFoodpost.save();
        // Redirect to the same foodpost detail page
        res.redirect(`/foodposts/${foundFoodpost._id}`);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
}
// new for edit
async function edit(req, res) {
    console.log(req.params.foodpostId)
    const foodpost = await Foodpost.findById( req.params.foodpostId);
    const review = foodpost.reviews.id(req.params.reviewId);
    res.render('foodposts/edit', { title: 'edit a review', review});
  }
  
async function update(req, res) {
    const foodpost = await Foodpost.findOne({'reviews._id': req.params.id});
    const reviewSubdoc = foodpost.reviews.id(req.params.id);
    if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/foodposts/${foodpost._id}`);
    reviewSubdoc.content = req.body.text;
    try{
        await foodpost.save();
    } catch(error) {
        console.log(error.message);
    }
    res.redirect(`/foodposts/${foodpost._id}`);
}
