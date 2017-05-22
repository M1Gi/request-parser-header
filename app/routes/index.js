var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    /* Look for the ip address in 4 ways & when found, store in 'ip' var: 
    1) By default, look in the 'headers' property of the HTTP Request. The headers are stored in a 
    JS Object, w/ the header strings as object keys. Hence look for the 'x-forwarded-for' key to 
    access the XFF de-facto standard header for identifying the originating IP address of the client 
    connecting to a web server through an HTTP proxy or load balancer. */
    var ip = req.headers['x-forwarded-for'] ||
            /* 2) Look in the request object's 'connection' prop (which is a net.Socket object). The net.Socket 
            object has a prop 'remoteAddress' which is a string representation of the remote IP address; access 
            the IP address string in 'remoteAddress'. */
            req.connection.remoteAddress ||
            /* 3) Look in the request object's 'socket' prop for the string representation of the remote IP 
            address. */
            req.socket.remoteAddress ||
            /* 4) Look in the req object's connection prop for a socket prop which is an obj with the 
            'remoteAddress' prop (a string representation of the remote IP address); access the value of 
            'remoteAddress'. */
            req.connection.socket.remoteAddress;
    // Create an object (info) that stores the IP address, language, & OS for the browser making the request 
    var info = {
        'ip-address': ip, // Set the IP Address key's value to the 'ip' variable
        /* In the headers prop of the HTTP Request, access the 'accept-language' key's value (a string) & split 
        the string into an Array at each comma; then access the first element in the array (index 0) which 
        contains the language for the browser making the request; set this as the language key's value. */
        'language': req.headers["accept-language"].split(',')[0],
        /* In the headers prop of the HTTP Request, access the 'user-agen' key's value (a string) & split 
        the string into an Array at 1) an inward parenthesis followed by a space ') ' then access that element 
        (the 1st element in the array); 2) then split that 1st element into another array at an a space 
        followed by an outward parenthesis ' (' then access the string after the split (the 2nd element in the 
        array); set this as the software key's value (giving the OS Company Name and Operating System Version). */
        'software': req.headers['user-agent'].split(') ')[0].split(' (')[1]
    };
    // Send back the info obj as HTTP response
    res.send(info);
});

module.exports = router;



