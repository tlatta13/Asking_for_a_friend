//const db = require('../../models');

$(document).ready(function () {
  // when the page loads, retrieve the last selected question from local storage and render it
  // if local storage is empty, make an api request to render a question from database
  const renderLastQuestion = () => {
    var title = localStorage.getItem('title');
    var content = localStorage.getItem('content');

    if (title === null && content === null) {
      $.get('/api/all')
        .then(function (questions) {
          $('#display-question-title').text(questions[0].title);
          $('#display-question-content').text(questions[0].question);
        });
    }

    $('#display-question-title').text(title);
    $('#display-question-content').text(content);
  };
  // calling function to render last clicked question
  renderLastQuestion();
  answerShower = function () {
    $.get('/api/questions/' + 1 + '/answers')
      .then(function (questions) {
        let lastQuestion = questions[questions.length - 1].Answers;
        console.log(lastQuestion);
        let lastAnswer = lastQuestion[lastQuestion.length - 1].answer;
        console.log(lastAnswer);
        let newPTag = $('<p>').text(lastAnswer);
        $('#answer-list').append(newPTag);
      });
  };

  $('#question-form').on('click', function (event) {
    event.preventDefault();
    let newQuestion = {
      title: $('#title-input').val().trim(),
      question: $('#question-input').val().trim()
    };

    // Does a post to the question route.
    $.post('/api/questions', newQuestion)
      .then(function () {
        alert('New question added');
        location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });
  });

  $('#answer-add').on('click', function (event) {
    //console.log(this);
    let dataId = $(this).attr('data-id');
    let id = (typeof dataId === 'undefined') ? 1 : dataId; //this was originally just ----let id = $(this).attr('data-id');
    //console.log(id);
    event.preventDefault();
    let newAnswer = {
      answer: $('#answer-input').val().trim()
    };
    $.post('/api/questions/' + id + '/answers', newAnswer) //This originally just had id instead of testid;
      .then(function (response) {
        console.log(response);
        // create a new <li> and append it to the <ol> in questions.handlebars
        let newAnswer = $('<li>' + response.answer + '</li>');
        $('#answer-list').append(newAnswer);
        $('#answer-input').val('');
      });
  });

  // When a question is clicked from the "Unanswered Questions" or "Answered Questions" panels
  $('a.panel-block').on('click', function (event) {
    event.preventDefault();
    // remove the <li>s from the <ol> in "Answers"
    $('#answer-list').empty();
    let id = $(this).data('id');
    let $title = $('#display-question-title');
    let $content = $('#display-question-content');
    let $created = $('#display-createdAt');
    // add a data-id attribute to the submit button in the answer form
    $('#answer-add').attr('data-id', id);

    $.get('/api/all')
      .then(function (questions) {
        // compare the id of the questions table with the id of the question that was clicked
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].id === id) {
            $title.text(questions[i].title);
            $content.text(questions[i].question);
            $created.text(questions[i].createdAt);
            console.log($title.text());
            console.log($content.text());
            localStorage.setItem('title', $title.text());
            localStorage.setItem('content', $content.text());
            localStorage.setItem('created', $created.text());
          }
        }
      });
    $.get('/api/questions/' + id + '/answers')
      .then(function (questions) {
        let lastQuestion = questions[questions.length - 1].Answers;
        console.log(lastQuestion);
        let lastAnswer = lastQuestion.slice(-5);
        lastAnswer.forEach((answer) => {
          let newli = $('<li>').text(answer.answer);
          $('#answer-list').append(newli);
        });
        // for (let i = 0; i < lastAnswer.length; i++) {
        //   let num = i + 1;
        //   let newPTag = $('<p>').text(num + '. ' + lastAnswer[i].answer);
        //   $('#answer-list').append(newPTag);
        // }
      });
  });
});

