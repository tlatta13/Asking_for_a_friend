$(document).ready(function() {
  // Getting references to our form and inputs
  // These will change based on our html
  var loginForm = $('form.login');
  var usernameInput = $('input#username-input'); //Change this to username
  var passwordInput = $('input#password-input');

  // When the form is submitted, we validate there's an username and password entered
  loginForm.on('submit', function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(), //This will change to username
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) { //Change this to username
      return;
    }

    // If we have an username and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password); //change this to username
    usernameInput.val(''); //change this to username
    passwordInput.val('');
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) { //change this to username
    $.post('/api/login', {
      username: username, //change this to username
      password: password
    })
      .then(function() {
        window.location.replace('/questions');
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
