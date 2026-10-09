const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {savedRedirectUrl,isloggedin} = require("../middleware.js");
const userController = require("../controllers/users.js");
const { renderLoginForm, logout } = require("../controllers/users.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
    .route("/signup")
    .get(userController.renderSignupForm)
    // .post(wrapAsync(userController.signup))
    .post(upload.single("profileImage"),wrapAsync(userController.signup)) // this line help us to to upload the profile image 


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

// router.get("/profile",isloggedin,wrapAsync(userController.renderProfile));

router.get("/wishlist",isloggedin,wrapAsync(userController.renderWishlist));

router.get("/logout",userController.logout);

module.exports = router;