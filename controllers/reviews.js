const Book = require('../models/book')

module.exports = {
  create
}

function create(req, res) {
  Book.findById(req.params.id, (err, book) => {
    book.reviews.push(req.body)
    book.save((err, book) => {
      res.redirect(`/books/${book._id}`)
    })
  })
}
