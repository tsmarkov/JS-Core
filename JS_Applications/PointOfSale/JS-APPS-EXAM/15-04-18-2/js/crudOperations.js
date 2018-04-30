const BASE_URL = 'https://baas.kinvey.com';
const APP_KEY = 'kid_r1uYbCl3f';
const APP_SECRET = 'c52918d47fd34f9bb216e5a26d4c9363';
const AUTH_HEADERS = {
    "Authorization": "Basic " + btoa(APP_KEY + ":" + APP_SECRET)
};

const BOOKS_PER_PAGE = 5;

function loginUser() {
    let username = $('#formLogin input[name=username]').val();
    let password = $('#formLogin input[name=passwd]').val();

    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY + '/login',
        headers: AUTH_HEADERS,
        data: {
            username,
            password
        }
    })
        .then((res) => signInUser(res, 'Successful login'))
        .catch(handleAjaxError);
}

function registerUser() {
    let username = $('#register-form input[name=username]').val();
    let password = $('#register-form input[name=password-register]').val();
    let confirmPassword = $('#register-form input[name=password--check]').val();

    if (password !== confirmPassword) {

    }

    $.ajax({
        method: 'POST',
        url: BASE_URL + 'user/' + APP_KEY,
        headers: AUTH_HEADERS,
        data: {
            username,
            password
        }
    })
        .then((res) => signInUser(res, 'Successful registration'))
        .catch(handleAjaxError);
}



function deleteBook(book) {
    let bookId = book.target.parentNode.parentNode.getAttribute('id');

    let currentAuth = getCurrentKinveyAuth();

    $.ajax({
        method: 'DELETE',
        url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + bookId,
        headers: currentAuth
    })
        .then(() => {
            showInfo('Book deleted.')
            listBooks()
        })
        .catch(handleAjaxError);
}

function saveAuthInSession(res) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authToken', res._kmd.authtoken);
    sessionStorage.setItem('userId', res._id);
}

function logoutUser() {
    sessionStorage.clear();

    showHomeView();
    showHideMenuLinks();
    showInfo('Logout successful.');
}

function signInUser(res, message) {
    saveAuthInSession(res);

    showHomeView();
    showHideMenuLinks();
    showInfo(message);
}


function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)

    if (response.readyState === 0) {
        errorMsg = "Cannot connect due to network error."
    }

    if (response.responseJSON && response.responseJSON.description) {
        errorMsg = response.responseJSON.description
    }

    showError(errorMsg)
}

function getCurrentKinveyAuth() {
    return {
        "Authorization": "Kinvey " + sessionStorage.getItem('authToken')
    }
}