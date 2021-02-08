const express = require('express'); // same instance is passed which has been created at app.js(created once)

const router = express.Router();

const homeController = require('../controllers/home_controller');
router.get('/',homeController.home);

console.log('router loaded');


module.exports = router;