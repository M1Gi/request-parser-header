// Call the packages needed
var express = require('express'); // Import Express module
var app = express(); // Create an Express App
/* Set the Entry Point and store it in the var 'routes'. 
-> The Entry Point is the JS file (index.js) that will be invoked when consumers of your 
module 'require()' it (this file includes the main logic for your module). */
var routes = require('./app/routes/index');

app.use('/', routes);

/* Access the PORT property in the object containing the user environment by default OR 
use 8080 as the port if default not available. Store result in 'port' variable. */
var port = process.env.PORT || 8080; 
// Listen for connections on the specfied port and run a callback
app.listen(port, function() {
    // Print message describing what port Node.js is listening on
    console.log('Node.js listening on port ' + port);
});

module.exports = app;
