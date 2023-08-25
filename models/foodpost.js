const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    title: {
        type: String,
        enum: ['Japanese Food', 'Mexican Food', 'American Food'],
        required: true //***check out do I need a required???
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    //   }, *** mongoose-movie have this two string
    //   userName: String,
    //   userAvatar: String
    },
    img: {
        type: Schema.Types.ObjectId,
    // }, right now I have no idea to do the image part 
    },
    review: {
        type: Schema.type.ObjectId,
        ref: 'Review',   
    },
    timestamps: true
  });
// here are the foodpost include four items, title, user, img, reviews. 


  module.exports = mongoose.model('Foodpost', foodpostSchema);
  // name first and single as a class