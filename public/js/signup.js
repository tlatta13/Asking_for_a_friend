$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $('form.signup');
  var usernameInput = $('input#username-input');
  var passwordInput = $('input#password-input');
  var passwordVerify = $('input#password-verify');

  function handleLoginErr() {
    $('#alert').text('Username already exists');
    $('#alert').fadeIn(500);
  }
  // Does a post to the signup route. If successful, we are redirected to the questions page
  // Otherwise we log any errors
  function signUpUser(username, password) {
    $.post('/api/signup', {
      username: username,
      password: password
    })
      .then(function () {
        window.location.replace('/questions');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  // When the signup button is clicked, we validate the username and password are not blank
  signUpForm.on('submit', function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      alert('Must input a username and password!');
      return;
    }

    // If we have an username and password, run the signUpUser function
    signUpUser(userData.username, userData.password);
    usernameInput.val('');
    passwordInput.val('');
    passwordVerify.val('');

  });
});
