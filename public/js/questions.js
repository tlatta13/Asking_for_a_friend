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

  $('#answer-update').on('click', function(event) {
    event.preventDefault();
    var newAnswer = {
      answer: $('#answer-input').val().trim()
    };

    $.post('/api/questions/:id/answer', newAnswer)
      .then(function() {
        console.log('New answer submitted');
        location.reload();
      });
  });
});