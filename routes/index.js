const express = require('express'); // same instance is passed which has been created at app.js(created once)

const router = express.Router();

// accessing the home_controller.js in controllers folder
const homeController = require('../controllers/home_controller');

console.log('router loaded');

// calling the call back function for this "/" route
router.get('/',homeController.home);

// for any request that comes with users we move to users.js
router.use('/users',require('./users'));

// for any further routes access from here
// router.use('routername',require('./routerfile'));



module.exports = router;