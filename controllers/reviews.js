const Book = require('../models/book')

module.exports = {
  create
}

function create(req, res) {
  Book.findById(req.params.id, function(err, book) {
    book.reviews.push(req.body)
    book.save(function(err) {
      res.redirect(`/books/${book._id}`)
    })
  })
}
