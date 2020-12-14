const Book = require("../models/book");
const axios = require("axios");

module.exports = {
    new: newBook,
    index,

}


function newBook(req, res) {
    res.render("books/new", {
                title: "Add a new book to your collection",
                user: req.user
            });
}

function index(req, res) {
    Book.find({})
    .then((err, books) => {
        res.render("books/index", {title: "All the books that have been added are here.", books})
    })
}
