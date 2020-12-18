const forum = require('../models/forum')

module.exports = {
  index,
  create
}

function index(req, res) {
  forum.find({})
  .then((forums) => {
    res.render("forums/index", {
      user: req.user,
      title: "Forum Board",
      forums: forums.reverse()
    })
  })
}

function create(req, res) {
  req.body.postedBy = req.user.name
  req.body.avatar = req.user.avatar
  forum.create(req.body)
  .then(() => {
    res.redirect('/forums')
  })
}
