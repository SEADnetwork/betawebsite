var express = require('express');
var router = express.Router();
var passport = require('passport')
var util = require('util')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource mothafucka');
});

router.get('/test', function(req, res, next) {
  res.send('respond with a resource test mothafuckaq');
});

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });


// router.post('/login',
//   function(req, res) {
//   	res.send('wadduuup');
//   });


module.exports = router;
