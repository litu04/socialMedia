const express = require('express');
const router = express.Router();


// accessing the users_controller.js
const userController = require('../controllers/users_controller');

// calling the call back function for this "/profile" route
router.get('/profile',userController.profile);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
router.post('/create-session',userController.createSession);

module.exports = router;