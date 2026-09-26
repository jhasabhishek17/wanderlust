//In starting we have to require all the necessary things 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://unsplash.com/photos/person-cooking-eggs-on-a-stovetop-following-a-recipe-PAG-wzE6R7s"
        }
    },

    price: {
    type:  Number,
    required:true,
    },
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review",
        }
    ]
});

listingSchema.post ("findOneAndDelete",async (listing) =>{
    if(listing)
    await Review.deleteMany({_id : {$in: listing.reviews}});

});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;