const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/reviews');

router.post('/:id/reviews', reviewsCtrl.create);
router.delete('/reviews/:id', reviewsCtrl.delete);

module.exports = router;