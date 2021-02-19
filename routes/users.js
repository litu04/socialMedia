const express = require('express');
const router = express.Router();
const passport = require('passport');


// accessing the users_controller.js
const userController = require('../controllers/users_controller');

// calling the call back function for this "/profile" route
router.get('/profile',passport.checkAuthentication,userController.profile);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
),userController.createSession);

router.get('/sign-out',userController.destroySession);

module.exports = router;