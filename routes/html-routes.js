// Requiring path to so we can use relative routes to our HTML files
var path = require('path');

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isAuthenticated');

module.exports = function(app) {

  app.get('/', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/questions'); //was originally members
    }
    res.renderView('index');
  });

  app.get('/login', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/questions');
    }
    res.sendFile(path.join(__dirname, '../views/login.handlebars'));
  });

  app.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/signup.handlebars'));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/questions', isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, '../views/questions.handlebars'));
  });

  //isAuthenticated above is the middleware being inserted into just a specific route.
  //On line 27, it is checking to see if the user is authenticated before sending back the questions page.
};
