const Book = require("../models/book");


module.exports = {
    new: newBook,
    index,
    details,
    create,
    delete: deleteBook,
    update,
    edit
}


function index(req, res) {
  Book.find({ userAdding: req.user._id })
  .then((books) => {
    res.render('books/index', {
        title: "All books",
        user: req.user,
        books:books
    })
  })
}


function newBook(req, res) {
    res.render("books/new", {
                title: "Add a new book to your collection",
                user: req.user
            });
  };


function details(req, res) {
    Book.findById(req.params.id, (err, book) => {
        res.render("books/details", {
            title: "Book details",
            book,
            user: req.user});
    });
  };

function create(req, res) {
    req.body.read = !!req.body.read
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    const book = new Book(req.body);

  book.userAdding = req.user._id;
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
          user: req.user});
  });
  };
