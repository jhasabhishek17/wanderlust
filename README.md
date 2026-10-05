<div align="center">

# 🌍 WANDERLUST

### *Your next escape is just a click away.*

**Discover unique stays. Create unforgettable places. Save the ones you love.**

<br>

<a href="https://wanderlust-imfd.onrender.com/listings">
  <img src="https://img.shields.io/badge/🌐%20LIVE%20DEMO-Visit%20Wanderlust-fe424d?style=for-the-badge">
</a>
<a href="https://github.com/jhasabhishek17/wanderlust">
  <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github">
</a>

<br><br>

<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-Framework-000000?style=flat-square&logo=express">
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/EJS-Templating-A91E50?style=flat-square">
<img src="https://img.shields.io/badge/Mapbox-Maps-000000?style=flat-square&logo=mapbox">
<img src="https://img.shields.io/badge/Cloudinary-Images-3448C5?style=flat-square&logo=cloudinary">

<br><br>

### 🚀 [EXPLORE THE LIVE APP](https://wanderlust-imfd.onrender.com/listings)

</div>

---

## 🧭 What is Wanderlust?

**Wanderlust** is a full-stack accommodation platform built to bring the complete travel-listing experience into one application.

It isn't just a collection of CRUD pages.

It combines:

**Authentication → Listings → Search → Categories → Wishlist → Reviews → Maps → Cloud Storage → Deployment**

into one connected application.

The goal was to understand how a real-world web application works from the browser all the way to the database and external services.

---

## ✨ The Wanderlust Experience

<div align="center">

|       🔎 DISCOVER      |       🏡 CREATE       |       ❤️ SAVE       |    ⭐ SHARE    |
| :--------------------: | :-------------------: | :-----------------: | :-----------: |
| Search & explore stays | Publish your own stay | Build your wishlist | Rate & review |

</div>

### 🔎 Discover

Search stays using:

* Location
* Country
* Listing title
* Categories

Explore destinations through visual category filters.

### 🏡 Create

Authenticated users can:

* Create listings
* Upload images
* Add descriptions
* Set prices
* Select categories
* Add locations

### ❤️ Save

Found somewhere you love?

Add it to your personal wishlist and access your saved stays anytime.

### ⭐ Share

After visiting a listing, users can share their experience through:

* 1–5 star ratings
* Reviews
* User-associated feedback

---

# 🗺️ A Listing Is More Than a Card

Every listing connects multiple pieces of the application.

```text
                       🏡 LISTING
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
       🖼️ Image         💰 Price         📍 Location
          │                │                │
      Cloudinary        MongoDB          Mapbox
          │                │                │
          └────────────────┼────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
          ⭐ Reviews                ❤️ Wishlist
              │                         │
              └────────────┬────────────┘
                           ▼
                       👤 User
```

This is what makes Wanderlust more than a simple CRUD project.

---

# 🧠 Under the Hood

Wanderlust follows an **MVC architecture**.

```text
                         USER
                           │
                           ▼
                    ┌─────────────┐
                    │    EJS UI   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │    ROUTES   │
                    └──────┬──────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   MIDDLEWARE    │
                  │                 │
                  │ Auth            │
                  │ Authorization   │
                  │ Validation      │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   CONTROLLERS   │
                  └────────┬────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   MODELS    │
                    │  Mongoose   │
                    └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   MongoDB   │
                    └─────────────┘
```

---

# 🧩 Feature Map

```text
                         WANDERLUST
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   DISCOVERY              COMMUNITY             SECURITY
        │                     │                     │
   ┌────┼────┐           ┌────┴────┐          ┌────┴────┐
   │    │    │           │         │          │         │
 Search Categories     Reviews   Ratings    Login   Ownership
   │    │
   └────┴───────┐
                ▼
             Listings
                │
       ┌────────┼────────┐
       ▼        ▼        ▼
   Wishlist   Images    Maps
              │          │
         Cloudinary    Mapbox
```

---

# 🔥 Feature Highlights

### 🔐 Authentication

Secure user authentication using:

`Passport.js` · `Passport Local` · `Express Session` · `Connect-Mongo`

Users must authenticate before accessing protected functionality.

---

### 🛡️ Ownership-Based Authorization

Wanderlust doesn't simply check whether a user is logged in.

It also checks:

> **"Does this resource actually belong to this user?"**

```text
Logged In?
    │
    ├── NO ──────► Access Denied
    │
    └── YES
         │
         ▼
    Owner?
      │   │
     YES  NO
      │    │
      ▼    ▼
    Allow  Deny
```

This protects listing and review operations.

---

### 🔎 Smart Search

The search system can match listings using:

```text
Search Query
     │
     ├── Title
     ├── Location
     └── Country
```

Combined with category filtering, users can quickly narrow down available stays.

---

### ❤️ Wishlist System

Each user has their own wishlist.

```text
User
 │
 ├── Listing A ❤️
 ├── Listing C ❤️
 └── Listing F ❤️
```

The wishlist is stored through MongoDB relationships rather than browser-only storage.

---

### ⭐ Reviews & Ratings

Reviews connect:

```text
USER ──────► REVIEW ◄────── LISTING
              │
              ├── Rating
              └── Comment
```

This creates a relational-style structure on top of MongoDB references.

---

### 🗺️ Location Intelligence

A user enters:

```text
"Goa, India"
```

Wanderlust sends the location to Mapbox:

```text
Human Location
       ↓
Mapbox Geocoding
       ↓
Longitude + Latitude
       ↓
GeoJSON Point
       ↓
Interactive Map
```

---

### ☁️ Cloud Image Pipeline

```text
Browser
   ↓
Multer
   ↓
Cloudinary
   ↓
Image URL
   ↓
MongoDB
```

The application doesn't need to store uploaded images directly on the server.

---

# 🎨 Categories

Explore stays through destination-inspired categories:

<div align="center">

🔥 **Trending**
🛏️ **Bed & Breakfast**
🏙️ **Iconic Cities**
⛰️ **Mountains**
🏰 **Castles**
🏊 **Amazing Pools**
🥾 **Campaign**
🌾 **Farms**
🧊 **Arctic**
🏕️ **Domes**
⛵ **Boats**

</div>

---

# 🛠️ Technology Stack

### Frontend

`HTML5` · `CSS3` · `JavaScript` · `EJS` · `EJS-Mate` · `Bootstrap` · `Font Awesome`

### Backend

`Node.js` · `Express.js`

### Database

`MongoDB` · `Mongoose` · `MongoDB Atlas`

### Authentication

`Passport.js` · `Passport Local` · `Express Session` · `Connect-Mongo`

### Cloud & APIs

`Cloudinary` · `Mapbox`

### Validation & Utilities

`Joi` · `Multer` · `Method Override` · `Connect-Flash`

### Deployment

`Render`

---

# 📂 Project Structure

```text
Wanderlust/
│
├── controllers/          # Application logic
│   ├── listing.js
│   ├── review.js
│   └── users.js
│
├── models/               # MongoDB schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/               # Application routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/                # EJS templates
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   ├── reviews/
│   └── users/
│
├── public/               # Static assets
│   ├── css/
│   └── js/
│
├── utils/                # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── middleware.js
├── schema.js
├── cloudConfig.js
├── app.js
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone

```bash
git clone https://github.com/jhasabhishek17/wanderlust.git
cd wanderlust
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file:

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

MAP_TOKEN=your_mapbox_token

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> 🔒 Keep `.env` private. Never commit credentials or API secrets to GitHub.

## 4. Start the application

```bash
node app.js
```

For development:

```bash
nodemon app.js
```

Open:

```text
http://localhost:8080
```

---

# 🌐 Live Application

<div align="center">

### ✈️ Ready for takeoff?

<br>

<a href="https://wanderlust-imfd.onrender.com/listings">
<img src="https://img.shields.io/badge/🌍%20EXPLORE%20WANDERLUST-fe424d?style=for-the-badge&labelColor=222222">
</a>

<br><br>

**[Open the Live Application →](https://wanderlust-imfd.onrender.com/listings)**

</div>

---

# 📸 Screenshots

> Add your actual screenshots to the `images/` directory.

### 🏠 Explore

![Explore Listings](./images/home.png)

### 🏡 Listing Details

![Listing Details](./images/listing-details.png)

### 🗺️ Map

![Interactive Map](./images/map.png)

### ⭐ Reviews

![Reviews](./images/reviews.png)

### ❤️ Wishlist

![Wishlist](./images/wishlist.png)

---

# 📈 What This Project Demonstrates

Wanderlust demonstrates practical implementation of:

```text
CRUD
 │
 ├── Create
 ├── Read
 ├── Update
 └── Delete
       │
       ▼
Authentication
       │
       ▼
Authorization
       │
       ▼
Validation
       │
       ▼
Database Relationships
       │
       ▼
Third-Party APIs
       │
       ▼
Cloud Storage
       │
       ▼
Production Deployment
```

---

# 🧠 Key Learning

Building Wanderlust provided hands-on experience with:

* Full-stack application architecture
* MVC design patterns
* RESTful routing
* MongoDB relationships
* Authentication & authorization
* Session management
* Request validation
* Error handling
* Cloud image storage
* API integration
* GeoJSON
* Search and filtering
* Git & GitHub
* Production deployment

---

# 🔮 What's Next?

Wanderlust is designed to grow beyond the current accommodation platform.

### Future roadmap

```text
                 WANDERLUST 2.0
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
    BOOKINGS        PAYMENTS        MESSAGING
       │               │                │
       └───────────────┼────────────────┘
                       ▼
                 HOST DASHBOARD
                       │
                       ▼
                 SMART SEARCH
                       │
                       ▼
               RECOMMENDATION SYSTEM
```

Potential additions:

* 📅 Booking & availability
* 💳 Online payments
* 💬 Host–guest messaging
* 🔔 Notifications
* 📊 Host dashboard
* 🔍 Advanced filtering
* 🤖 Personalized recommendations

---

# 👨‍💻 About the Developer

<div align="center">

## Abhishek Jha

**B.Tech — Electronics & Communication Engineering**

Building with:

`JavaScript` · `Node.js` · `Express` · `MongoDB` · `React` · `Cloud`

Interested in:

**Full-Stack Development · Backend Engineering · Cloud & DevOps · AI & Automation**

</div>

---

<div align="center">

### 🌍 Wherever you go, Wanderlust goes with you.

<br>

**If you like the project, ⭐ the repository!**

<br>

Built with ❤️ by **Abhishek Jha**

</div>
