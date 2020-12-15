const Book = require("../models/book");
const axios = require("axios");

module.exports = {
    new: newBook,
    index,
    details,
    create
}


function newBook(req, res) {
    res.render("books/new", {
                title: "Add a new book to your collection",
                user: req.user
            });
}

function index(req, res) {
    Book.find({}, function(err, books) {
      res.render('books/index', {title: "All books", books: books, user: req.user})
    })
  }

// function index(req, res) {
//     Book.find({})
//     .then((err, books) => {
//         console.log(books, "books")
//         res.render("books/index", {
//             title: "All the books that have been added are here.",
//             books: books,
//             user: req.user})
//     })
// }

function details(req, res) {
    Book.findById(req.params.id)
    .then((err, book) => {
        res.render("books/details", {
            title: "Book details",
            book,
            user: req.user})
    })
}

function create(req, res) {
    req.body.read = !!req.body.read
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    const book = new Book(req.body)
    book.save((err) => {
      if (err) {
        console.log(err)
        return res.render('books/new', {err: err})
      }
      console.log(book)
      res.redirect(`/books/${book._id}`)
    })
  }
