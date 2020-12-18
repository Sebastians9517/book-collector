const router = require('express').Router();
const forumsCtrl = require('../controllers/forums');

router.get('/', isLoggedIn, forumsCtrl.index);
router.post('/', isLoggedIn, forumsCtrl.create);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
