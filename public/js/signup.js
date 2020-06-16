$(document).ready(function() {
  // Getting references to our form and input
  // These will change based on our html
  var signUpForm = $('form.signup');
  var usernameInput = $('input#username-input'); //change this to username
  var passwordInput = $('input#password-input');

  // When the signup button is clicked, we validate the username and password are not blank
  signUpForm.on('submit', function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(), //change this to username
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      alert('Must input a username and password!'); //change to username
      return;
    }
    // If we have an username and password, run the signUpUser function
    signUpUser(userData.username, userData.password); //change this to username
    usernameInput.val(''); //change this to username
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, password) { //change this to username
    $.post('/api/signup', {
      username: username, //change this to username
      password: password
    })
      .then(function(data) {
        window.location.replace('/questions');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $('#alert .msg').text(err.responseJSON);
    $('#alert').fadeIn(500);
  }
});
