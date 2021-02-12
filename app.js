// we take const because we don't want the variable to be overridden by anybody else
// require the express library
const express = require('express');


const app = express();

// by default websites run on port 80
const port = 8000;

//using express router(middleware)
// for the homepage request we are moving to the routes folder index.js
app.use('/',require('./routes'));

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// app listens to the port and run on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`); // interpolation way to print the message
        return;
    }
    console.log(`Server is running on port: ${port}`);      // interpolation way to print the message
});

