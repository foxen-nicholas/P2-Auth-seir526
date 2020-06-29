// Required NPM libraries
require('dotenv').config();
// require express and setup an express app instance
const Express = require('express');
// require and set view engine using ejs
const ejsLayouts = require('express-ejs-layouts')
// set app to use false urlencoding
// set app public directory for use
// set app ejsLayouts for render 

// App setup
const app = Express();
app.use(Express.urlencoded({ extended: false}));
app.use(Express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// ROUTES
app.get('/', function(req, res) {
  // check to see if the user logged in
  res.render('index');
})

// initialize 
app.listen(process.env.PORT || 3000, function() {
  console.log(`Rootin n Tootin on port ${process.env.PORT}`)
});