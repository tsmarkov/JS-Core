const BASE_URL = 'https://baas.kinvey.com/';
const APP_KEY = 'kid_r1bDxQIiM';
const APP_SECRET = '5c894af7197447299d3b693afb2920c1';
const AUTH_HEADERS = {
  "Authorization": "Basic " + btoa(APP_KEY + ":" + APP_SECRET)
}
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
  let username = $('#formRegister input[name=username]').val();
  let password = $('#formRegister input[name=passwd]').val();

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

function listBooks() {
  let currentAuth = getCurrentKinveyAuth();

  $.ajax({
      method: 'GET',
      url: BASE_URL + 'appdata/' + APP_KEY + '/books',
      headers: currentAuth
    })
    .then(displayPaginationAndBooks)
    .catch(handleAjaxError);
}


function createBook() {
  let $formCreateBook = $('#formCreateBook');

  let title = $formCreateBook.find('input[name=title]').val();
  let author = $formCreateBook.find('input[name=author]').val();
  let description = $formCreateBook.find('textarea[name=description]').val();

  let currentAuth = getCurrentKinveyAuth();

  $.ajax({
      method: 'POST',
      url: BASE_URL + 'appdata/' + APP_KEY + '/books',
      headers: currentAuth,
      data: {
        title,
        author,
        description
      }
    })
    .then(() => {
      showInfo('Book created.')
      listBooks()
    })
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

function loadBookForEdit(book) {
  console.log('TOWA OTDOLU');
  console.log(sessionStorage);


  showView('viewEditBook');

  let $bookTr = $(book.target.parentNode.parentNode);
  let id = $bookTr.attr('id');
  let tds = $bookTr.find('td');

  console.log(id);
  console.log(tds[0].innerHTML);

  let $editBook = $('#formEditBook');

  $editBook.find('input[name=id]').val(id);
  $editBook.find('input[name=title]').val(tds[0].innerHTML);
  $editBook.find('input[name=author]').val(tds[1].innerHTML);
  $editBook.find('textarea[name=description]').val(tds[2].innerHTML);
}

function editBook() {
  let $editBook = $('#formEditBook');

  let id = $editBook.find('input[name=id]').val();
  let title = $editBook.find('input[name=title]').val();
  let author = $editBook.find('input[name=author]').val();
  let description = $editBook.find('textarea[name=description]').val();

  let currentAuth = getCurrentKinveyAuth();

  $.ajax({
      method: 'PUT',
      url: BASE_URL + 'appdata/' + APP_KEY + '/books/' + id,
      headers: currentAuth,
      data: {
        title,
        author,
        description
      }
    })
    .then(() => {
      showInfo('Book edited.')
      listBooks()
    })
    .catch(handleAjaxError);
}

function saveAuthInSession(userInfo) {
  // TODO
}

function logoutUser() {
  sessionStorage.clear();

  showHomeView();
  showHideMenuLinks();
  showInfo('Logout successful.');
}

function signInUser(res, message) {
  sessionStorage.setItem('username', res.username);
  sessionStorage.setItem('authToken', res._kmd.authtoken);
  sessionStorage.setItem('userId', res._id);

  showHomeView();
  showHideMenuLinks();
  showInfo(message);
}

function displayPaginationAndBooks(books) {
  showView('viewBooks');

  let pagination = $('#pagination-demo');

  if (pagination.data("twbs-pagination")) {
    pagination.twbsPagination('destroy');
  }

  pagination.twbsPagination({
    totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
    visiblePages: 5,
    next: 'Next',
    prev: 'Prev',

    onPageClick: function(event, page) {
      //Clear the table
      $("#books table tbody").find("tr").slice(1).remove();

      let startBook = (page - 1) * BOOKS_PER_PAGE;
      let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length);

      $(`a:contains(${page})`).addClass('active');

      for (let i = startBook; i < endBook; i++) {
        console.log('Books info');
        console.log(books[i]);

        let tr = ($('<tr>').attr('id', books[i]._id))
          .append($('<td>').text(books[i].title))
          .append($('<td>').text(books[i].author))
          .append($('<td>').text(books[i].description));

        let $actionTD = $('<td>');

        if (books[i]._acl.creator === sessionStorage.userId) {
          $actionTD
            .append($('<a href="#">')
              .text('[Delete]')
              .on('click', deleteBook))
            .append('<br>')
            .append($('<a href="#">')
              .text('[Edit]')
              .on('click', loadBookForEdit))
        }

        tr.append($actionTD);
        $('#books table tbody').append(tr);
      }
    }
  })
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