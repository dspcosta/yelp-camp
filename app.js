const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist/css"));

let campgrounds = [
    { name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg" },
    { name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg" },
    { name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg" }
];

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = { name: name, image: image };

    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("YelpCamp server has started!");
});
