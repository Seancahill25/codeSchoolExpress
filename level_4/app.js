var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

var cities = {
   "Boston": "Massachusetts",
   "Providence": "Rhode Island", 
   "Hartford": "Connecticut", 
   "Warwick": "Rhode Island",
   "New York City": "New York"
};
app.post('/cities', parseUrlencoded, function(req, res) {
   if (req.body.city.length > 4 || req.body.state.length > 2) {
      var newCity = req.body;
      cities[newCity.city] = newCity.state;
      res.status(201).json(newCity.city);
   } else {
      res.status(400).json("Not enough characters")
   }
});
app.delete('/cities/:city', function(req, res) {
   delete cities[req.cityName];
   res.status(200);
});
app.use(express.static('public'));

app.param('name', function(req, res, next) {
   var name = req.params.name;
   var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
   req.cityName = city;
   next();
});

app.get('/cities', function(req, res){
    if (req.query.limit >= 0) { 
        res.json(cities.slice(0, req.query.limit));
   } else if (req.query.limit > cities.length) {
      res.status(404, "Error not enough Cities");
   } else  {
      res.json(Object.keys(cities));
   }
});

app.get("/cities/:city", function(req, res) {
   var description = cities[req.cityName];
   if (!description) {
      res.status(404).json("Error No description found");
   } else {
      res.json(description);
   }
});

app.listen(process.env.PORT);