const URL = "https://phonebook-17c7e.firebaseio.com/phonebook";
const phonebook = $("#phonebook");
const person = $("#person");
const phone = $("#phone");

$("#btnLoad").on("click", load);
$("#btnCreate").on("click", create);

function load() {
  phonebook.empty();
  $.ajax({
      method: "GET",
      url: URL + ".json"
    })
    .then(handleSuccess)
    .catch(handleError);

  function handleSuccess(res) {
    for (let key in res) {
      appendLi(res[key].name, res[key].phone, key);
    }
  }
}

function create() {
  let personName = person.val();
  let phoneNumber = phone.val();
  let newObj = JSON.stringify({
    name: personName,
    phone: phoneNumber
  });

  $.ajax({
      method: "POST",
      url: URL + ".json",
      data: newObj
    })
    .then(appendNewData)
    .catch(handleError);

  function appendNewData(res) {
    appendLi(personName, phoneNumber, res.name);
    person.val("");
    phone.val("");
  }
}

function appendLi(name, phone, key) {
  let li = $(`<li>${name}: ${phone} </li>`);
  let deleteBtn = $('<a href="#">[Delete]</a>').on("click", function() {
    $.ajax({
        method: "DELETE",
        url: URL + "/" + key + ".json"
      })
      .then($(li).remove())
      .catch(handleError)
  })

  $(li).append(deleteBtn);
  $(phonebook).append(li);
}

function handleError(err) {
  console.error(err);
}