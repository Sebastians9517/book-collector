const mongoose = require('mongoose');
const Schema = mongoose.Schema;





const bookSchema = new Schema({
    title: {type: String,
            required: true},
    cover: String,
    author: {type: String,
            default: "Anonymous"},
    publicationDate : {type: String,
                       default: "Unknown"},
    description: String,
    reviews: [reviewSchema]
}, {
    timestamps: true
})


