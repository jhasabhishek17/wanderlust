const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js") // to connect any file or folder we must require the things first 
const {validatereview, isloggedin, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
const reviews = require("../models/review.js");


//Reviews Route
// Post Review Route

router.post("/",isloggedin, validatereview, wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete("/:reviewId",isloggedin,isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;