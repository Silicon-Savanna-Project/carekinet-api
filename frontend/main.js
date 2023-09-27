import './style.css';

const API_URL = 'http://localhost:3000/users/tokens';

let access_token;
let refresh_token = localStorage.getItem('refresh_token');
let resource_owner;


const signupForm = document.querySelector('#sign_up_form');
const signinForm = document.querySelector('#sign_in_form');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector("#sign_up_email").value;
    const password = document.querySelector("#signup_password").value;
    const password_confirmation = document.querySelector("#signup_password_confirm").value;
    if (password !== password_confirmation) {
        alert("Password and password confirmation do not match");
        return;
    }

    const response = await fetch(`${API_URL}/sign_up`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    // Then store the access_token and refresh_token
    await handleAuthResponse(response);
    userSession();
});

async function handleAuthResponse(response) {
    const data = await response.json();

    localStorage.setItem("resource_owner", JSON.stringify(data.resource_owner));
    localStorage.setItem('refresh_token', data.refresh_token);
    access_token = data.access_token;
    refresh_token = data.refresh_token;
    resource_owner = data.resource_owner;
}


function nullOrUndefined(value) {
    return value === null || value === undefined;
}
async function userSession() {
    await refresh_token();
    await requestNewAccessToken();
    window.access_token = access_token;
    if (nullOrUndefined(access_token)) {
        document.querySelector('#sign_in_form').style.display = 'block';
        document.querySelector('#sign_up_form').style.display = 'block';
        document.querySelector('#sign_out').style.display = 'none';
    } else {
        document.querySelector('#sign_in_form').style.display = 'none';
        document.querySelector('#sign_up_form').style.display = 'none';
        document.querySelector('#sign_out').style.display = 'block';
    }
    getUser();
}
