
var mongoose = require('mongoose');

//schema setup

var campgroundSchema = new  mongoose.Schema({
	name: "string",
	image: "string",
	description: "string"
});


// create model
var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;
