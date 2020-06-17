// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isAuthenticated');
const db = require('../models');

module.exports = function(app) {

  app.get('/', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/questions'); //was originally members
    }
    res.render('index');
  });

  app.get('/login', function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect('/questions');
    }
    res.render('login');
  });

  app.get('/signup', function(req, res) {
    res.render('signup');
  });

  app.get('/index', function(req, res) {
    res.render('index');
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get('/questions', isAuthenticated, function(req, res) {
    db.Question.findAll({})
      .then(questions => {
        res.render('questions', { questions: questions });
      });
  });

  //isAuthenticated above is the middleware being inserted into just a specific route.
  //On line 27, it is checking to see if the user is authenticated before sending back the questions page.
};