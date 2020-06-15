$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function(data) {
    $('.member-name').text(data.username);
  });
});

//This was changed to questions.js erroneously. If something breaks look here.
