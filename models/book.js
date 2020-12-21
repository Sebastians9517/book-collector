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
    description: {type: String, default: "The legendary bestseller that made millions look at the world in a radically different way returns in a new edition, now including an exclusive discussion between the authors and bestselling professor of psychology Angela Duckworth. Which is more dangerous, a gun or a swimming pool? Which should be feared more: snakes or french fries? Why do sumo wrestlers cheat? In this groundbreaking book, leading economist Steven Levitt—Professor of Economics at the University of Chicago and winner of the American Economic Association’s John Bates Clark medal for the economist under 40 who has made the greatest contribution to the discipline—reveals that the answers. Joined by acclaimed author and podcast host Stephen J. Dubner, Levitt presents a brilliant—and brilliantly entertaining—account of how incentives of the most hidden sort drive behavior in ways that turn conventional wisdom on its head."},
    userAdding: [{ type: Schema.Types.ObjectId, ref: "User"}],
    reviews: [reviewSchema]
}, {
    timestamps: true
});


module.exports = mongoose.model("Book", bookSchema);
