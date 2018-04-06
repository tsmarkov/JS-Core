function attachEvents() {
  const URL = 'https://baas.kinvey.com/appdata/kid_BJKL2xljG/';
  const BASE_64 = btoa('guest' + ':' + 'guest');
  const AUTH = {
    'Authorization': 'Basic ' + BASE_64
  };

  const $CATCHES = $('#catches');
  const $ASIDE = $('#aside');
  const $ADD_FORM = $ASIDE.find('#addForm');

  $ASIDE.find('.load').on('click', loadCatches);
  $ADD_FORM.find('.add').on('click', addCatch);

  function loadCatches() {
    console.log("<- loadCatches ->");

    $.ajax({
        method: 'GET',
        url: URL + 'biggestCatches',
        headers: AUTH
      })
      .then(renderCatches)
      .catch(handleError);
  }

  function addCatch(res) {
    console.log('<- addCatch ->');

    // $.ajax({
    //     method: 'GET',
    //     url: URL + 'biggestCatches',
    //     headers: AUTH,
    //     body: body
    //   })
    //   .then(renderCatches)
    //   .catch(handleError);
  }

  function renderCatches(catches) {
    console.log('<- renderCatches ->');

    $CATCHES.empty();

    for (let currentCatch of catches) {
      let $catch = fillForm(currentCatch);

      $CATCHES.append($catch);
    }
  }

  function updateCatch() {
    console.log('<- updateCatch ->');

    // $.ajax({
    //     method: 'PATCH',
    //     url: URL + 'biggestCatches',
    //     headers: AUTH,
    //   })
    //   .then()
    //   .catch();
  }

  function deleteCatch(event) {
    console.log('<- deleteCatch ->');
    let catchDiv = event.target.parentNode;
    let id = catchDiv.getAttribute('data-id');

    $.ajax({
        method: 'DELETE',
        url: URL + `biggestCatches/${id}`,
        headers: AUTH
      })
      .then(() => catchDiv.remove())
      .catch(handleError);
  }

  function handleError() {
    console.error("Error handeled.");
  }

  function fillForm(data) {
    return $(`<div class="catch" data-id="${data._id}">`)
      .append($(`<label>Angler</label>`))
      .append($(`<input type="text" class="angler" value="${data.angler}"/>`))
      .append($(`<label>Weight</label>`))
      .append($(`<input type="number" class="weight" value="${data.weight}"/>`))
      .append($(`<label>Species</label>`))
      .append($(`<input type="text" class="species" value="${data.species}"/>`))
      .append($(`<label>Location</label>`))
      .append($(`<input type="text" class="location" value="${data.location}"/>`))
      .append($(`<label>Bait</label>`))
      .append($(`<input type="text" class="bait" value="${data.bait}"/>`))
      .append($(`<label>Capture Time</label>`))
      .append($(`<input type="number" class="captureTime" value="${data.captureTime}"/>`))
      .append($(`<button class="update">Update</button>`)
        .on('click', updateCatch))
      .append($(`<button class="delete">Delete</button>`)
        .on('click', deleteCatch));
  }
}