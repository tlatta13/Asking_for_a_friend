$(document).ready(function() {
  $('#question-form').on('submit', function(event) {
    event.preventDefault();
    var newQuestion = {
      question: $('#question-input').val().trim(), //change this to username
      category: $('#category-input').val().trim()
    };

    // Does a post to the question route.
    $.post('/api/questions', newQuestion)
      .then(function() {
        console.log('New question added');
        location.reload();
        // If there's an error, handle it by throwing up a bootstrap alert
      });

    $('#question-input').val('');
    $('#category-input').val('');
  });

  $('#answer-update').on('click', function(event) {
    event.preventDefault();
  });
});