// require express
const express = require('express');
// import router
const router = express.Router();
//import db
const db = require('../models');
// import middleware
const flash = require('flash');
// TODO: 
const passport;

// register GET route
router.get('/register', function(req, res) {
  res.render('auth/register');
})
//register POST route
router.post('/register', function(req, res) {db.user.findOrCreate({
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
    console.log(`Erro found. \nMessage: ${err.message}. \nPlease review - ${err}`);
    req.flash('error', err.message);
    res.redirect('/auth/register');
  })

})

//login get route
router.get('/login', function(req,res) {
  res.render('auth/login');
})

// login post route
router.post('login', function(req, res) {
  passport.authenticate('local', function(error, user, info) {
    // If no user authenticated
    if (!user) {
      req.flash('erro', 'Invalid username or password');
      // save to our user session no username
      // redirect our user to try logging in again
    }
    if (error) {

      return error;
    }

    req.login(function(user, error) {
      // if error move to erro
      // if success flash success message
      // if success save session and redirect user
    })
  })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  succssFlash: 'Welcome to our app!',
  failureFlash: 'Invalid username or password.'
}))
// export router
module.exports = router;