const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.delete('/reviews/:id', reviewsCtrl.delete);

// new for edit
router.get('/foodposts/:foodpostId/reviews/:reviewId/edit', reviewsCtrl.edit);
router.put('/reviews/:id', reviewsCtrl.update);

module.exports = router;