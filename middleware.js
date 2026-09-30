const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");

module.exports.isloggedin = (req,res,next)=> {
     if (!req.isAuthenticated()){ // this method help us to identify that user is logged in or not
        //redirect url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing ");
        return res.redirect("/login");
    }
    next();
}

module.exports.savedRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    } 
    next();
}


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing.owner.equals(res.locals.curUser._id)) {
        req.flash("error", "you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports.validateListing = (req,res,next) =>{
     let {error} = listingSchema.validate(req.body);
     if (error){
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,error);
     } else {
        next();
     }

};

module.exports.validatereview = (req,res,next) =>{
     let {error} = reviewSchema.validate(req.body);
     if (error){
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,error);
     } else {
        next();
     }

};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review.author.equals(res.locals.curUser._id)) {
        req.flash("error", "you are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }

    next();
};