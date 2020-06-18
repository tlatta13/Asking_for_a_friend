//const db = require('../../models');

$(document).ready(function () {
  // going to write code here to render question to main body
  // $(window).on( 'load', function() {

  // });
  answerShower = function() {
    $.get('/api/questions/' + 1 +'/answers')
      .then(function(questions){
        let lastQuestion = questions[questions.length-1].Answers;
        console.log(lastQuestion);
        let lastAnswer = lastQuestion[lastQuestion.length-1].answer;
        console.log(lastAnswer);
        let newPTag = $('<p>').text(lastAnswer);
        $('#answer-list').append(newPTag);
      });
  };

  

  $('#question-form').on('click', function (event) {
    event.preventDefault();
    var newQuestion = {
      title: $('#title-input').val().trim(),
      question: $('#question-input').val().trim()
    };

    // Does a post to the question route.
    $.post('/api/questions', newQuestion)
      .then(function () {
        alert('New question added');
        location.reload();
      })
      .catch(function(err) {
        console.log(err);
      });
  });

  $('#answer-add').on('click', function (event) {
    //console.log(this);
    var dataId = $(this).attr('data-id');
    var id = (typeof dataId === 'undefined') ? 1 : dataId; //this was originally just ----var id = $(this).attr('data-id');
    //console.log(id);
    event.preventDefault();
    var newAnswer = {
      answer: $('#answer-input').val().trim()
    };
    $.post('/api/questions/' + id + '/answers', newAnswer) //This originally just had id instead of testid;
      .then(function (response) {
        console.log(response);
        // create a new <li> and append it to the <ol> in questions.handlebars
        var newAnswer = $('<li id="remove-num">' + response.answer + '</li>');
        $('#answer-list').append(newAnswer);
        $('#answer-input').val('');
      });
  });

  // When a question is clicked from the "Unanswered Questions" or "Answered Questions" panels
  $('a.panel-block').on('click', function (event) {
    event.preventDefault();
    // remove the <li>s from the <ol> in "Answers"
    $('#answer-list').empty();
    var id = $(this).data('id');
    var $title = $('#display-question-title');
    var $content = $('#display-question-content');
    // add a data-id attribute to the submit button in the answer form
    $('#answer-add').attr('data-id', id);

    $.get('/api/all')
      .then(function (questions) {
        // compare the id of the questions table with the id of the question that was clicked
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].id === id) {
            $title.text(questions[i].title);
            $content.text(questions[i].question);
          }
        }
      });
    $.get('/api/questions/' + id +'/answers')
      .then(function(questions){
        let lastQuestion = questions[questions.length-1].Answers;
        console.log(lastQuestion);
        let lastAnswer = lastQuestion.slice(-5);
        lastAnswer.forEach((answer)=> {
          let newPTag = $('<p>').text(answer.answer);
          $('#answer-list').append(newPTag);
        });
      });
  });
});

