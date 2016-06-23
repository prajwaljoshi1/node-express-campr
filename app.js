var express = require('express');
var app = express();

app.set("view engine", "ejs");


app.get("/",function(req,res){
  res.render("home");
});

app.get("/campgrounds", function(req, res){
  var campgrounds = [
    {name: 'camp 1', image : 'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
    {name: 'camp 2', image : 'https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg'},
    {name: 'camp 3', image : 'https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg'}
  ];

  res.render("campgrounds", {campgrounds: campgrounds});
});


app.listen(3000, function(){
  console.log("Campr server started in port 3000");
});
