function getArticleGenerator(articles) {
  return function () {
    if (articles.length > 0) {
      let newArticle = $(`<article>${articles.shift()}</article>`);
      newArticle.appendTo($('#content'));
    }
  }
}
