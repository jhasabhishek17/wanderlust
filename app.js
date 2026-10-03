// we can not use our env file in our production phase we can use it only development phase whenever we upload to guthub we can't upload in github or etc
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

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
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


//Connection code
//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
main()
.then(()=>{
    console.log("connected to DB");
 })
.catch((err) =>{
  console.log(err);
})

async function main() {
    await mongoose.connect(dbUrl);
    
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("Error in MONGO SESSION STORE");
})

// below we add cookie session code
const sessionOption ={
    store,
    secret: process.env.SECRET,
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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // serializeuser means serialize user into the session  stores information related to user 
passport.deserializeUser(User.deserializeUser());// deserializer user - to unstore the user information


// flash middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;
    next();
});

app.get("/demouser",async(req,res) => {
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "hariom"
    });
    let registeredUser= await User.register(fakeUser,"Helloooo");
    res.send(registeredUser);
})


// app.get("/",(req,res) =>{
//     res.send("Hi , I am Root");
// });

app.get("/", (req, res) => {
    res.redirect("/listings");
});





//BASIC APIs

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

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

