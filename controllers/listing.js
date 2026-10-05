// in controllers folder we are going to write all the callback code (controllers)

const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});



module.exports.index = async (req,res)=>{
   let {search,category} = req.query;
   let allListings;

   if(search && category){
      allListings = await Listing.find({
         category: category,
         $or: [
            {title: {$regex: search, $options: "i"}},
            {location: {$regex: search, $options: "i"}},
            {country: {$regex: search, $options: "i"}}
         ]
      });
   } else if(search){
      allListings = await Listing.find({
         $or: [
            {title: {$regex: search, $options: "i"}},
            {location: {$regex: search, $options: "i"}},
            {country: {$regex: search, $options: "i"}}
         ]
      });
   } else if(category){
      allListings = await Listing.find({category: category});
   } else {
      allListings = await Listing.find({});
   }

   res.render("listings/index.ejs",{allListings});
};


module.exports.renderNewForm = (req,res) =>{    
    res.render("listings/new.ejs");

};

module.exports.showListing = (async (req,res) =>{
    let {id} = req.params;

    const listing = await Listing.findById(id)
        .populate({path:"reviews",populate: {path: "author"}})
        .populate("owner");

    if(!listing) {
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    console.log(listing);
    console.log("Reviews: ", listing.reviews);

    res.render("listings/show.ejs",{listing,mapToken});
});

// below is the code for mapbox api to show the location of the listing on the map
module.exports.createListing = async (req,res,next) =>{
    let response  = await geocodingClient.forwardGeocode({
         query: req.body.listing.location,// this is the location we want to show on the map
         limit : 1,
    }) 
    .send();

    let url= req.file.path;
    let filename = req.file.filename;
     const newListing = new Listing(req.body.listing);
     newListing.owner = req.user._id;
     newListing.image = {url,filename};

     newListing.geometry = response.body.features[0].geometry; // this is to get the geometry of the location we want to show on the map
     let savedListing = await newListing.save();
     console.log(savedListing);
     req.flash("success", "New Listing Created");
     res.redirect("/listings");
    };


module.exports.renderEditForm = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error","Listening you requested for does not exist");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");//this is to resize the image to 300x250 pixels using cloudinary transformation
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};

module.exports.updateListing = async(req,res) =>{
   let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file !== "undefined"){
        
    let url= req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
   req.flash("success", "Listing Updated");
   res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};

module.exports.toggleWishlist = async(req,res)=>{
    let {id} = req.params;
    let index = req.user.wishlist.findIndex(item => item.toString() === id);

    if(index === -1){
        req.user.wishlist.push(id);
        req.flash("success","Added to wishlist");
    } else {
        req.user.wishlist.splice(index,1);
        req.flash("success","Removed from wishlist");
    }

    await req.user.save();
    res.redirect(`/listings/${id}`);
};