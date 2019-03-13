const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist/css"));

// SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res) {
    res.render("landing");
});

// INDEX ROUTE
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { campgrounds: allcampgrounds });
        }
    });
});

app.post("/campgrounds", function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = { name: name, image: image, description: description };

    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// NEW - form to create new Campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampgroud) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", { campground: foundCampgroud });
        }
    });
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("YelpCamp server has started!");
});
