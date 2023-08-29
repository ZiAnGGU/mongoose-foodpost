const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  name: {
    name: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);