let mongoose = require("mongoose");
let Campground = require("./models/campground");
let comment = require("./models/comment");

let data = [
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104490f3c37fa6e5b4bc_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        name: "Eagle's Nest",
        image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104490f3c37fa6e5b4bc_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        name: "Sky Rocket Mountain",
        image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104490f3c37fa6e5b4bc_340.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
];

function seedDB() {
    Campground.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground!");
                    Comment.create({
                        text: "This place is amazing, but I wish there was internet",
                        author: "Bart"
                    }, function(err, comment) {
                        if (err) {

                        } else {
                            campground.comment.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
