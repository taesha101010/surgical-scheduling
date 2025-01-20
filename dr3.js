// Inside dr3.js

// Add event listener to the login form
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the default form submission

  // Reset the error message before checking
  const loginError = document.getElementById('loginError');
  loginError.style.display = 'none';

  // Get the username and password values entered by the user
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Set valid credentials for testing (you can change these)
  const validUsername = "admin";  // Change this as needed
  const validPassword = "password123";  // Change this as needed

  // Check if the entered username and password match the valid credentials
  if (username === validUsername && password === validPassword) {
      // Reset form fields after successful login
      document.getElementById('loginForm').reset();

      // Redirect to scheduler.html (relative path)
      window.location.href = 'dr1.html';  // Using relative path
  } else {
      // Show the error message if the login is invalid
      loginError.style.display = 'block';
  }
});
