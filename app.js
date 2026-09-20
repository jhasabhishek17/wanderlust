const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js") // to connect any file or folder we must require the things first 


//Connection code
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



//BASIC APIs

app.get("/",(req,res) =>{
    res.send("Hi , I am Root");
})

// Test Listing
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing ({
//         title: "My new villa",
//         description: "By the Beach",
//         price: 2000,
//         location: "Goa",
//         country: "India",
//     });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

// app.listen(8080,() => {
//     console.log("server is listening on port 8080");
// });

