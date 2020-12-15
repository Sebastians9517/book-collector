var router = require("express").Router();
const booksCtrl = require("../controllers/books");

router.get("/new", isLoggedIn, booksCtrl.new);
router.get("/index", isLoggedIn, booksCtrl.index);
router.post("/", isLoggedIn, booksCtrl.create);
router.get("/:id", isLoggedIn, booksCtrl.details);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


module.exports = router;
