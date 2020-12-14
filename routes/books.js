var router = require("express").Router();
const booksCtrl = require("../controllers/books");

router.get("/new", isLoggedIn, booksCtrl.new);
router.get("/", isLoggedIn, booksCtrl.index)


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


module.exports = router;
