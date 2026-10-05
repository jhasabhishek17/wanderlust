const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedRedirectUrl,isloggedin} = require("../middleware.js");
const userController = require("../controllers/users.js");
const { renderLoginForm, logout } = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup))


    router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
    savedRedirectUrl,
    passport.authenticate("local",{
     failureRedirect: "/login",
     failureFlash: true,
}), 
  userController.login
);



// router.post("/login",
//     savedRedirectUrl,
//     passport.authenticate("local",{
//      failureRedirect: "/login",
//      failureFlash: true,
// }), 
//   userController.login
// );


router.get("/wishlist",isloggedin,wrapAsync(userController.renderWishlist));

router.get("/logout",userController.logout);

module.exports = router;