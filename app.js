var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Campground = require('./models/campground.js');
var seedDB = require('./seeds');




mongoose.connect("mongodb://localhost/campr");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
seedDB();
//
// Campground.create({
// 	name: "Salmon Creek",
// 	image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg",
// 	description :"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// })




//index
app.get("/", function(req, res){
	res.redirect("/campgrounds");
});

app.get("/campgrounds", function(req, res){
// get all campgrounds from db;
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			 console.log(err);
		}else{
			res.render("index", {campgrounds:allCampgrounds});
		}
	});
});



app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});


//create
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};




	Campground.create( newCampground, function(err,campground){
		if(err){
			console.log(err);
		}else{
			console.log("campground added successfully");
			res.redirect("/campgrounds");
		}
	})

	//campgrounds.push(newCampground);
	//redirect back to campgrounds page

});

//SHOW
app.get("/campgrounds/:id", function(req, res){

	//find campground with a  id
	var id = req.params.id;

 Campground.findById( id ).populate('comments').exec(function(err,foundCampground){
	 	if(err){
			console.log("something went wrong");
		}else{
			console.log("=======================> ", foundCampground);
			res.render("show", {campground: foundCampground});
		}
 });
});


app.listen(3000, function(){
	console.log("App running on 3000, baby!");
})
