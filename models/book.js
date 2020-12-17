const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    content: String,
    reviewer: String,
    avatar: String,
    rating: {type: Number,
             min: 0,
             max: 5},
}, {
    timestamps: true
});


const bookSchema = new Schema({
    title: {type: String,
            required: true},
    cover: String,
    author: {type: String,
            default: "Anonymous"},
    publicationDate : {type: String,
                       default: "Unknown"},
    read: {type: Boolean,
           default: false},
    description: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model("Book", bookSchema);
