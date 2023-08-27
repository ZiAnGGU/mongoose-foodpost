const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodpostSchema = new Schema({
    name: {
        type: String,
        // enum: ['Japanese Food', 'Mexican Food', 'American Food'],
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
    category: {
        type: String,
        enum: ['Japanese Food', 'Mexican Food', 'American Food'],
        required: true
      },
    imageUrl: {
        type: String,
        required: true
    },
    // foodpost: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Post',
    // }
    nowPosting: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
// here are the foodpost include four items, title, user, img, reviews. 


  module.exports = mongoose.model('Foodpost', foodpostSchema);
  // name first and single as a class, it is the model 