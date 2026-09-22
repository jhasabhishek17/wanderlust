//In starting we have to require all the necessary things 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;