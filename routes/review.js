const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js") // to connect any file or folder we must require the things first 


const validatereview = (req,res,next) =>{
     let {error} = reviewSchema.validate(req.body);
     if (error){
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,error);
     } else {
        next();
     }

};

//Reviews Route
// Post Review Route

router.post("/reviews", validatereview, wrapAsync(async(req,res)=>{
    console.log(req.body);

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");

   res.redirect(`/listings/${listing._id}`)
}));

// Delete Review Route
router.delete("/reviews/:reviewId",
    wrapAsync(async (req,res) =>{
        let {id,reviewId} = req.params;

        await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
        Review.findByIdAndDelete(reviewId);
        req.flash("success", "Review deleted");

        res.redirect(`/listings/${id}`);
    })
);

module.exports = router;