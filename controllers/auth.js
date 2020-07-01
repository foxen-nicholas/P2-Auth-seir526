// require express
const express = require('express');
// import router
const router = express.Router();
//import db
const db = require('../models');
// import middleware
const flash = require('flash');
// TODO: 
const passport = require('../config/ppConfig');

// register GET route
router.get('/register', function(req, res) {
  res.render('auth/register');
})
//register POST route
router.post('/register', function(req, res, next) {db.user.findOrCreate({
  where: {
      email: req.body.email
    }, defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(function([user, created]) {
    // if user was created
    if(created) {
      // authenticate user and start authorization process
      console.log("User created!");
      passport.authenticate('local', {
        succesRedirect: '/profile',
        successFlash: 'Thanks for signing up!'
      }) (req, res, next);
      res.redirect("/");
    } else {
      // else if user already exists
      // send error to user that email already exists
      // redirect back to register get route
      console.log("User email already exists!")
      req.flash('error', 'Error: email already exists for user. Try again.');
      req.redirect('/auth/register');
    }
  }).catch(function(err) {
    console.log(req.body);
    console.log(`Error found. \nMessage: ${err.message}. \nPlease review - ${err}`);
    req.flash('error', err.message);
    res.redirect('/auth/register');
  })
})

//login get route
router.get('/login', function(req,res) {
  res.render('auth/login');
});

// login post route
router.post('login', function(req, res, next) {
  passport.authenticate('local', function(error, user, info) {
    // If no user authenticated
    if (!user) {
      req.flash('error', 'Invalid username or password');
      req.session.save(function() {
        return res.redirect('/auth/login');
      });
      // save to our user session no username
      // redirect our user to try logging in again
    }
    if (error) {
      return next(error);
    }

    req.login(user, function(error) {
      // if error move to error
      if(error) next(error);
      // if success flash success message
      req.flash('Success', 'You are validated and logged in.');
      // if success save session and redirect user
      req.session.save(function() {
        return res.redirect('/profile');
      })
    })
  })(req, res, next);
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/auth/login',
  succssFlash: 'Welcome to our app!',
  failureFlash: 'Invalid username or password.'
}))

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})
// export router
module.exports = router;