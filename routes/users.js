const express = require('express');
const router = express.Router();

// accessing the users_controller.js
const userController = require('../controllers/users_controller');

// calling the call back function for this "/profile" route
router.get('/profile',userController.profile);

module.exports = router;