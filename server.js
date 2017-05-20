// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
// you aren't actually using the path module in this file so there's no need to require it
// var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Ensures css from the public folder will work
app.use(express.static('app/public'))

// Routes
// =============================================================


require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);



// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
  console.log('App listening on PORT ' + PORT);
  console.log("");
})