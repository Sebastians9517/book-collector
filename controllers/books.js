const Book = require("../models/book");
const axios = require("axios");

module.exports = {
    new: newBook,
    index,
    details,
    create,
    delete: deleteBook,
    update,
    edit
}


function newBook(req, res) {
    res.render("books/new", {
                title: "Add a new book to your collection",
                user: req.user._id
            });
  };

function index(req, res) {
    Book.find({}, function(err, books) {
      res.render('books/index', {title: "All books", books: books, user: req.user._id});
    });
  };

function details(req, res) {
    Book.findById(req.params.id, (err, book) => {
        res.render("books/details", {
            title: "Book details",
            book,
            user: req.user._id});
    });
  };

function create(req, res) {
    req.body.read = !!req.body.read
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    const book = new Book(req.body);
    book.save((err) => {
      if (err) {
        console.log(err)
        return res.render('books/new', {err: err});
      };
      console.log(book)
      res.redirect(`/books/${book._id}`)
    });
  };

  function deleteBook(req, res) {
    Book.findByIdAndDelete(req.params.id, (err) => {
        res.redirect("/books/index");
    });
};

  function update(req, res) {
    req.body.read = !!req.body.read
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true},
      (err, book) => {
        res.redirect(`/books/${book._id}`);
      });
  };

  function edit(req, res) {
    Book.findById(req.params.id, (err, book) => {
      res.render("books/edit", {
          title: "Book edit",
          book,
          user: req.user._id});
  });
  };
