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

// function create(req, res) {
//   const book = new Book(req.body);
//   book.userRecommending = req.user._id;
//   book.save(function(err, book) {
//     if (err) return res.render("views/error.ejs");
//     res.redirect(`/books/${book._id}`);
//   });
// }

// function deleteBook(req, res) {
//   Book.findOneAndDelete({_id: req.params.id, userRecommending: req.user._id}, function(err) {
//       res.redirect('/books');
//     }
//   );
// }

// function edit(req, res) {
//   Book.findOne({_id: req.params.id, userRecommending: req.user._id}, function(err, book) {
//     if (err || !book) return res.redirect('/books');
//     res.render('books/edit', {book});
//   });
// }

// function update(req, res) {
//   Book.findOneAndUpdate(
//     {_id: req.params.id, userRecommending: req.user._id},
//     req.body,
//     {new: true},
//     function(err, book) {
//       if (err || !book) return res.redirect('/books');
//       res.redirect(`books/${book._id}`);
//     }
//   );
// }

function index(req, res) {
  Book.find({ userRecommending: req.user._id })
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

// function index(req, res) {
//     Book.find({}, function(err, books) {
//       res.render('books/index', {title: "All books", books: books, user: req.user});
//     });
//   };

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

  book.userRecommending = req.user._id;
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
