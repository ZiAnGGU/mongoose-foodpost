const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
// const Review = require('../models/reviews')

module.exports = {
    create,
    delete: deleteReview
};


router.post('/foodposts/:id/reviews', reviewsCtrl.create);

async function createReview(req, res) {
    const foodpost = await foodpost.findById(req.params.id);

    req.body.user = req.user.id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    foodpost.reviews.push(req.body);
    try {
        await foodpost.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/foodposts/${foodpost._id}`);
}
// not showing 
// async function deleteReview(req, res) {
//     const foodpost = await foodpost.findOne({'reviews._id': req.params.id, 'reviews.user: req.user._id'});
//     if(!foodpost) return res.redirect('/foodposts');
//     foodpost.reviews.remove(req.params.id);
//     await MongoDriverError.save();
//     res.redirect('/foodposts/${foodpost._id');
// }
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

// exports.show = async (req, res) => {
//     try {
//         const foodpost = await Foodpost.findById(req.params.id).populate('reviews');
//         res.render('foodposts/show', { foodpost });
//     } catch (err) {
//         console.log(err);
//         res.redirect('/foodposts');
//     }
// };

// exports.addReview = async (req, res) => {
//     try {
//         const foodpost = await Foodpost.findById(req.params.id);
//         const review = new Review(req.body);
//         foodpost.reviews.push(review);
//         await review.save();
//         await foodpost.save();
//         res.redirect(`/foodposts/${foodpost._id}`);
//     } catch (err) {
//         console.log(err);
//         res.redirect(`/foodposts/${req.params.id}`);
//     }
// };


module.exports = router;