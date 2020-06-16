$(document).ready(function() {

  $('#question-form').on('submit', function(event) {
    event.preventDefault();
    var newQuestion = {
      title: $('#title-input').val().trim(),
      question: $('#question-input').val().trim()
    };

    // Does a post to the question route.
    $.post('/api/questions', newQuestion)
      .then(function() {
        console.log('New question added');
        location.reload();
      });

    $('title-input').val().trim();
    $('#question-input').val('');
  });

  $('#answer-update').on('click', function(event) {
    event.preventDefault();
  });
});