const express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js") // to connect any file or folder we must require the things first 
const { isloggedin,isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

// common route for both index and post 

router 
 .route("/")
 .get(wrapAsync(listingController.index))
 .post(isloggedin,
   upload.single("listing[image]"),
   validateListing,
    wrapAsync (listingController.createListing)
 );

//New Route
router.get("/new",isloggedin,listingController.renderNewForm);
router.post("/:id/wishlist",isloggedin,wrapAsync(listingController.toggleWishlist));

router.route("/:id")
 .get(wrapAsync(listingController.showListing) )
 .put(isloggedin,isOwner,upload.single("listing[image]"),validateListing,wrapAsync (listingController.updateListing))
 .delete(isloggedin,isOwner,wrapAsync (listingController.destroyListing))

//DELETE Route

//Below code is to get the listing file (Index Route)

//router.get("/",  wrapAsync(listingController.index)); // we add common route for both index and post route above 

//Show Route

//router.get("/:id",wrapAsync(listingController.showListing) );

//Create Route

// router.post("/",isloggedin,validateListing,

//     wrapAsync (listingController.createListing)

// );

//Edit Route
router.get("/:id/edit",isloggedin,isOwner,wrapAsync(listingController.renderEditForm)
);

//Update Route

//router.put("/:id",isloggedin,isOwner,validateListing,wrapAsync (listingController.updateListing));

//DELETE Route

//router.delete("/:id",isloggedin,isOwner,wrapAsync (listingController.destroyListing));

module.exports = router;