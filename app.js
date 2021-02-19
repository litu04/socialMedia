// we take const because we don't want the variable to be overridden by anybody else
// require the express library
const express = require('express');

// accessing the cookie library
const cookieParser = require('cookie-parser');

const app = express();

// by default websites run on port 80
const port = 8000;

//using the express-ejs-layout library
const expressLayout = require('express-ejs-layouts')

//accessing the db
const db = require('./config/mongoose');

// accessing the express-session library (use for session cookie)
const session = require('express-session');

//accessing the passport library
const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo')(session);

const saasMiddleware = require('node-sass-middleware');

app.use(saasMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// parsing the post data
app.use(express.urlencoded())

//using the cookie parser
app.use(cookieParser());

//setting up the static files and accessing it
app.use(express.static('./assets'));

// using the expressLayout
app.use(expressLayout);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'social',
    //todo change the secret key before deployment in production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//using express router(middleware)
// for the homepage request we are moving to the routes folder index.js
app.use('/',require('./routes'));

// app listens to the port and run on the port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`); // interpolation way to print the message
        return;
    }
    console.log(`Server is running on port: ${port}`);      // interpolation way to print the message
});

