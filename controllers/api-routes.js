// Requiring our models and passport as we've configured it
var db = require('../models');
var passport = require('../config/passport');

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/signup', function (req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, '/api/login');
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Post route for user questions
  app.post('/api/questions', function (req, res) {
    db.Question.create({
      title: req.body.title,
      question: req.body.question,
      username: req.body.username
    }).then(function (result) {
      return res.json(result);
    })
      .catch(function(err) {
        console.log(err);
      });
  });

  app.post('/api/questions/:id/answers', function (req, res) {
    // create an Answer and associate it to question with id of req.params.id
    db.Answer.create({
      answer: req.body.answer,
      QuestionId: req.params.id
    }).then(createdAnswer => {
      res.json(createdAnswer);
    }).catch(err => {
      res.status(500).json(err);
    });
  });

  // Route for logging user out
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });

  // Route for getting all questions
  app.get('/api/all', function (req, res) {
    db.Question.findAll({}).then(function (results) {
      res.json(results);
    });
  });

  app.get('/api/questions/:id/answers', function (req, res) {
    db.Question.findAll({
      include: db.Answer, where: {id: req.params.id }
    }).then(function (result) {
      return res.json(result);
    });
  });
};