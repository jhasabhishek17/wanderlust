const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js") // to connect any file or folder we must require the things first 
const path = require("path");
const methodOverride = require("method-override");
const ejsMate =require("ejs-mate"); 
const wrapAsync =require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

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

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// below we add cookie session code
const sessionOption ={
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOption));
app.use(flash()); // first we have to use the flash then only we can use the write the code

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.success = req.flash("error");
    next();
});

app.get("/",(req,res) =>{
    res.send("Hi , I am Root");
});

//BASIC APIs




app.use("/listings", listings);
app.use("/listings/:id/reviews",reviews);

// "If the user requests a URL that none of my other routes handled, send a 404 error to the error-handling middleware."
app.all("/*splat",(req,res,next) => {
    next(new ExpressError(404,"page not found"));
});

// Error Handler
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something wet wrong"} = err;
    res.status(statusCode).render("error.ejs",{message});
    //res.status(statusCode).send(message);
});


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

app.listen(8080,() => {
    console.log("server is listening on port 8080");
});

