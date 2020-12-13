var router = require("express").Router();
const booksCtrl = require("../controllers/books");

router.get("/new", booksCtrl.new);


module.exports = router;
