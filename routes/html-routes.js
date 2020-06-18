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
  // app.get('/api/questions/:id/answers', function(req, res) {
  //   db.Question.findAll({
  //     include: db.Answer, where: {id: req.params.id }
  //   }).then(function (result) {
  //     let lastQuestion = result[result.length-1].Answers;
  //     let lastAnswer = lastQuestion[lastQuestion.length-1].answer;
  //     console.log(lastAnswer);
  //     res.render('questions', {answer: lastAnswer});
  //   });
  // });



  // app.get('/questions', isAuthenticated, function(req,res) {
  //   db.Answer.findAll({where: {QuestionId:{
  //     [Op.eq]: 2
  //   }}})
  //     .then(answers => {
  //       res.render('questions', { answers: answers });
  //     });
  // });

  //isAuthenticated above is the middleware being inserted into just a specific route.
  //On line 27, it is checking to see if the user is authenticated before sending back the questions page.
};