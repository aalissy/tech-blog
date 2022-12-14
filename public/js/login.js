// loginFormHandler allowing the user to login by username and password and putting it into the json file else returns an error
const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
