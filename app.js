const express = require('express');
const app = express();
const port = 8000;

//using express router
app.use('/',require('./routes/index.js'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`); // interpolation way to print the message
        return;
    }
    console.log(`Server is running on port: ${port}`);      // interpolation way to print the message
});

