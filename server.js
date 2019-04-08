var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");





// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

require("./routes/routes")(app);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/WSJHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});


