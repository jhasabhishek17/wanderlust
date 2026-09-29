// In index.js file we write all the initialzation logic

const mongoose = require("mongoose");
let initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
 })
.catch((err) =>{
  console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
    
}

// This function resets the listings collection, adds the owner ID to each initial listing,
// inserts all the prepared listing data into MongoDB, and confirms that the data was initialized.
const initDB = async() =>{
    await Listing.deleteMany({});
    initData = initData.data.map((obj)=> ({...obj,owner:"6abb6b424a388e19e54c9322"}));
    await Listing.insertMany(initData);
    console.log("data was initialized");
    initData
}

initDB();