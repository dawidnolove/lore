// app.js
import bcrypt from 'bcryptjs';

function handleCredentialResponse(response){
  fetch("auth_init.php", {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({request_type: 'user_auth', credential: response.credential })
  })
  .then(response => response.json())
  .then(data => { 
      if(data.status == 1){
        let responsePayload = data.pdata;
        let profileHTML = '<H3>WELCOME, finally '+responsePayload.given_name+'! <a href="javascript:void(0);"onclick="signOut('+responsePayload.sub+');">Sign out</a></h3>';

        profileHTML += '<img src="'+responsePayload.picture+'"/<p><b>Auth ID: </b>'+responsePayload.sub+'</p><p><b>Name: </b>'+responsePayload.name+'</p><p><b>Email: </b>'+responsePayload.email+'</p>';
        document.getElementsByClassName("pro-data")[0].innerHTML = profileHTML;

        document.querySelector("#google-button").classList.add("hidden");
        document.querySelector(".pro-data").classList.remove("hidden");

      }


  })
  .catch(console.error);
}
function signOut(authID){
  document.getElementsByClassName("pro-data")[0].innerHTML = '';
  document.querySelector("#google-button").classList.remove("hidden");
  document.querySelector(".pro-data").classList.add("hidden"); 

}

// Funkcja do inicjalizacji logowania Google
/*function initGoogleLogin() {
  google.accounts.id.initialize({
    client_id: '808524823459-pllp2dqj4c0mjj8f6th1m6dektvmu3iv.apps.googleusercontent.com',
    callback: handleGoogleLoginResponse,
  });

  google.accounts.id.renderButton(
    document.getElementById("google-login-button"), {
      theme: "outline",
      size: "large"
    }
  );
}

// Funkcja do obsługi odpowiedzi z Google Login
function handleGoogleLoginResponse(response) {
  console.log('Google login response:', response);
  // Możesz teraz wysłać response.credential na swój serwer lub zrobić coś z danymi
}

// Zdarzenie ładowania strony
document.addEventListener('DOMContentLoaded', function () {
  initGoogleLogin();
});*/

// Pozostała część logiki aplikacji, np. logowanie, rejestracja itp.
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=(.*\d.*){2,}).{8,}$/;
  return regex.test(password);
}

// Funkcja logowania
function handleLogin(event) {
  event.preventDefault();

  const email = document.querySelector('#mail').value;
  const password = document.querySelector('#password').value;

  if (!validateEmail(email)) {
    alert("Niepoprawny email");
    return;
  }
  if (!validatePassword(password)) {
    alert("Hasło musi mieć minimum 8 znaków, w tym dużą literę i dwie cyfry");
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  // Dalsza obsługa logowania
  console.log(`Zaloguj się: ${email}, Hasło: ${hashedPassword}`);
}

// Podobnie jak wyżej, masz funkcję do rejestracji, która hash'uje hasło i wysyła dane do backendu.

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', handleLogin);
});
