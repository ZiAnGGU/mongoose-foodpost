const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,

  },
  user: {

  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);