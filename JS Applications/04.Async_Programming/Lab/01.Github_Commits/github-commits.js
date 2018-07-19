function loadCommits() {
  const URL = 'https://api.github.com/repos/';

  const USERNAME = $('#username');
  const REP = $('#repo');
  const COMMITS = $('#commits');

  $.ajax({
      method: 'GET',
      url: `${URL}${USERNAME.val()}/${REP.val()}/commits`
    }).then(handleSucces)
    .catch(handleError);

  function handleSucces(res) {
    COMMITS.empty();
    res.forEach(c => {
      COMMITS.append($(`<li>${c.commit.author.name}: ${c.commit.message}</li>`))
    })
  }

  function handleError(error) {
    COMMITS.empty();
    COMMITS.append(`<li>Error: ${error.status} (${error.statusText})</li>`)
  }
}