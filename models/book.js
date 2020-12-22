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
    description: {type: String, default: "When half way through the journey of our life I found that I was in a gloomy wood, because the path which led aright was lost. And ah, how hard it is to say just what this wild and rough and stubborn woodland was, the very thought of which renews my fear! So bitter ’t is, that death is little worse; but of the good to treat which there I found, I ’ll speak of what I else discovered there."},
    userAdding: [{ type: Schema.Types.ObjectId, ref: "User"}],
    reviews: [reviewSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model("Book", bookSchema);
