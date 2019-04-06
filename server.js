var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");





// Require all models
var db = require("./models");

var PORT = 3000;

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

// Set Handlebars.
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/WSJHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// A GET route for scraping the echoJS website
// app.get("/scrape", function (req, res) {
//   // First, we grab the body of the html with axios
//   axios.get("https://www.wsj.com/").then(function (response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $(".wsj-card").each(function (i, element) {
//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this)
//         .children(".wsj-headline")
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children(".wsj-headline")
//         .children("a")
//         .attr("href");
//       result.summary = $(this)
//         .children(".wsj-card-body")
//         .children("p")
//         .children("span")
//         .text();

//       console.log(result);

//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function (dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);

//         })
//         .catch(function (err) {
//           // If an error occurred, log it
//           console.log(err);
//         });
//     });

//     // Send a message to the client
//     res.send("Scrape Complete");
//   });
// });
// app.get("/articles", function (req, res) {
//   // Grab every document in the Articles collection
//   db.Article.find({})
//     .then(function (dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function (err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
// });

// app.get("/clear", function (req, res) {
//   db.Article.remove({},
//     function (error, removed) {
//       // Log any errors from mongojs
//       if (error) {
//         console.log(error);
//         res.send(error);
//       }
//       else {
//         // Otherwise, send the mongojs response to the browser
//         // This will fire off the success function of the ajax request
//         console.log(removed);
//         res.send(removed);
//       }
//     }
//   );
// });

// app.put("/saved/:id", function (req, res) {


//   db.Article.update(
//     {
//       _id: mongojs.ObjectId(req.params.id)
//     },
//     {
//       $set: {
//         saved: true
//       }
//     },

//     function (err, saved) {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         console.log(saved);
//         res.send(saved)
//       }
//     })
// })

// app.get("/saved", function (req,res){
//   db.Article.find({
//     saved: true
//   }).then(function (dbArticle) {
//     // If we were able to successfully find Articles, send them back to the client
//     res.json(dbArticle);
//   })
//   .catch(function (err) {
//     // If an error occurred, send it to the client
//     res.json(err);
//   });
// });



// Listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port " + PORT);
});


