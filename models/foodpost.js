const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodpostSchema = new Schema({
    name: {
        type: String,
        required: true  // If you want this to be a required field
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
    // nowPosting: {
    //     type: String,
    //     default: true
    // }
}, { timestamps: true });

module.exports = mongoose.model('Foodpost', foodpostSchema);
