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


// App setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(require('morgan')('dev'));
app.use(helmet());
// ROUTES
app.get('/', function(req, res) {
  // check to see if the user logged in
  res.render('index');
})

// initialize 
app.listen(process.env.PORT || 3000, function() {
  console.log(`Rootin n Tootin on port ${process.env.PORT}`)
});