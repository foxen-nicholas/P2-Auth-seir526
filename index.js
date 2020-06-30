// Required NPM libraries
require('dotenv').config();

const Express = require('express');
// require and set view engine using ejs
const ejsLayouts = require('express-ejs-layouts')
//require all middleware for ap/authentication
// helmet, morga, passport, and custom middleware, express-session, sequelize session, flash
const helmet = require('helmet');
const session = require('express-session');
const flash = require("flash");
const passport = require('./config/ppConfig');
const db = require('./models');
// want to add alink to our customer middleware for isLoggedIn
const SequelizeStore = require('connect-session-sequelize')(session.Store)


// App setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());

// create new instance of class Sequelize Store
const sessionStore = new SequelizeStorre({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}))
// Need next bit to run the previous bit
sessionStore.sync();
// Initialize flash message, passport and session info
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res, next) {
  res.locals.alert = req.flash();
  res.locals.currentUser = req.user;

  next();
})

// ROUTES
app.get('/', function(req, res) {
  // check to see if the user logged in
  res.render('index')
})

// include auth controllers 
app.use('/auth', require('./controllers/auth'));
// initialize 
app.listen(process.env.PORT || 3000, function() {
  console.log(`Rootin n Tootin on port ${process.env.PORT}`)
});