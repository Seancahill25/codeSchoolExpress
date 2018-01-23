var express = require("express");
var app = express();

app.get("/cities", function(req, res) {
   var cities = ["Boston", "Providence", "Hartford", "Warwick"]; 
   res.json(cities);
});

app.use(express.static('public'));

app.listen(process.env.PORT);