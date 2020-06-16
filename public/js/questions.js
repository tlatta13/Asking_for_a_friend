$(document).ready(function() {
  $('#question-form').on('click', function(event) {
    event.preventDefault();
    var newQuestion = {
      title: $('#title-input').val().trim(),
      question: $('#question-input').val().trim()
    };

    // Does a post to the question route.
    $.post('/api/questions', newQuestion)
      .then(function() {
        alert('New question added');
        location.reload();
      });
  });

  $('#answer-add').on('click', function(event) {
    event.preventDefault();
    var newAnswer = {
      answer: $('#answer-input').val().trim()
    };
    $.post('/api/questions/:id/answers', newAnswer)
      .then(function() {
        console.log('New answer submitted');
        location.reload();
      });
  });

  $('.panel-block').on('click', function(event) {
    event.preventDefault();
    var id = $(this).data('id');
    var $title = $('#display-question-title');
    var $content = $('#display-question-content');

    $.get('/api/all')
      .then(function(questions) {
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].id === id) {
            $title.text(questions[i].title);
            $content.text(questions[i].question);
          }
        }
      });
  });
});