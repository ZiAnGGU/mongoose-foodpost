const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
    content: {
      name: String,
    },
  }, {
    timestamps: true
  });
const foodpostSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: String,
    userAvatar: String,
    category: {
        type: String,
        enum: ['Japanese Food', 'Mexican Food', 'American Food'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String
    }, 
    reviews: [reviewSchema]
}, { timestamps: true });


module.exports = mongoose.model('Foodpost', foodpostSchema);
