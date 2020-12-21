var router = require("express").Router();
const booksCtrl = require("../controllers/books");

router.get("/new", isLoggedIn, booksCtrl.new);
router.post("/", isLoggedIn, booksCtrl.create);
router.get("/index", isLoggedIn, booksCtrl.index);
router.get("/:id", isLoggedIn, booksCtrl.details);
router.delete("/:id", isLoggedIn, booksCtrl.delete);
router.get("/:id/edit", isLoggedIn, booksCtrl.edit);
router.put("/:id", isLoggedIn, booksCtrl.update);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }


module.exports = router;
