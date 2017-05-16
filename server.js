'use strict'; // Define that JS code should be run in 'strict mode' 

// Call the packages needed
var express = require('express'); // Import Express module
var app = express(); // Create an Express App
var routes = require('./app/routes/index.js');

var port = process.env.PORT || 8080; // Set our Port


routes(app);

app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
});

