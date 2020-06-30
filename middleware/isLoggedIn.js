// write a function we are going to use as middleware
module.exports = function(req, res, next) {
    if (!req.user) {
      req.flash('error', 'You must be loggied in to view this page.')
      res.redirect('/auth/login')
    } else {
      next();
    }
}
// check and see if we have a user variable set .if we do we woll allow our app to carry on
// but if we don;t we will let user knw they have to be logged in to acces
//redirect user to /auth/login