// function attachEvents() {
//   const URL = 'https://baas.kinvey.com/appdata/kid_SycrgFG9G/';
//   const USERNAME = 'guest';
//   const PASS = 'guest';
//   const AUTH_BASE64 = btoa(USERNAME + ':' + PASS);
//   const AUTH = {
//     'Authorization': 'Basic ' + AUTH_BASE64
//   };
//
//   const $posts = $('#posts');
//   const $postBody = $('#post-body');
//   const $postComments = $('#post-comments');
//
//   $('#btnLoadPosts').on('click', loadPosts);
//   $('#btnViewPost').on('click', viewPosts);
//
//   let posts = {};
//
//   function loadPosts() {
//     $postBody.empty();
//     $postComments.empty();
//
//     $.ajax({
//         method: 'GET',
//         url: URL + "posts",
//         headers: AUTH
//       })
//       .then(savePosts)
//       .catch(handleError);
//
//     function savePosts(recievedPosts) {
//       posts = {};
//
//       for (currentPost of recievedPosts) {
//         posts[currentPost._id] = currentPost;
//       }
//
//       renderPostOptions();
//     }
//
//     function renderPostOptions() {
//       $posts.empty();
//
//       for (key in posts) {
//         let currentPost = posts[key];
//
//         let option = $(`<option>`);
//         option.attr('id', currentPost._id);
//         option.text(currentPost.title)
//
//         $posts.append(option);
//       }
//     }
//   }
//
//   function viewPosts() {
//     let selectedPost = $posts.find('option:selected');
//     let postId = selectedPost.attr('id');
//
//     $.ajax({
//         method: 'GET',
//         url: URL + `comments/?query={"post_id":"${postId}"}`,
//         headers: AUTH
//       })
//       .then(renderPostDetails)
//       .catch(handleError);
//
//     function renderPostDetails(comments) {
//       renderBody();
//       renderComments(comments);
//
//
//       function renderBody() {
//         $postBody.empty();
//
//         let selectedPostBody = posts[postId].body;
//         $postBody.append(selectedPostBody);
//       }
//
//       function renderComments(comments) {
//         $postComments.empty();
//
//         for (let comment of comments) {
//           let $currentComment = $('<li>');
//           $currentComment.text(comment.text);
//
//           $postComments.append($currentComment);
//         }
//       }
//     }
//   }
//
//   function handleError(err) {
//     $postBody.empty();
//     $postComments.empty();
//
//     let $error = $('<h1>');
//     $error.text('Error');
//     $error.attr('style', 'color: red')
//     $postBody.append($error);
//   }
// }

function attachEvents() {
  const kinveyAppId = "kid_B1KyOfAZe";
  const serviceUrl = "https://baas.kinvey.com/appdata/" + kinveyAppId;
  const kinveyUsername = "peter";
  const kinveyPassword = "p";
  const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
  const authHeaders = {
    "Authorization": "Basic " + base64auth
  };
  $('#btnLoadPosts').click(loadPostsClick);
  $('#btnViewPost').click(viewPostClick);

  function loadPostsClick() {
    let loadPostsRequest = {
      url: serviceUrl + "/posts",
      headers: authHeaders
    };

    $.ajax(loadPostsRequest)
      .then(displayPosts)
      .catch(displayError);

    function displayPosts(posts) {
      $('#posts').empty();

      for (let post of posts) {
        $('#posts').append($('<option>').text(post.title).val(post._id));
      }
    }
  }

  function displayError(err) {
    let errorDiv = $("<div>").text("Error: " + err.status + ' (' + err.statusText + ')');
    $(document.body).prepend(errorDiv);

    setTimeout(function() {
      $(errorDiv).fadeOut(function() {
        $(errorDiv).remove();
      });
    }, 3000);
  }

  function viewPostClick() {
    let selectedPostId = $('#posts').val();
    if (!selectedPostId) {
      return;
    }

    let requestPosts = $.ajax({
      url: serviceUrl + "/posts/" + selectedPostId,
      headers: authHeaders
    });

    let requestComments = $.ajax({
      url: serviceUrl + `/comments/?query={"post_id":"${selectedPostId}"}`,
      headers: authHeaders
    });

    Promise.all([requestPosts, requestComments])
      .then(displayPostWithComments)
      .catch(displayError);

    function displayPostWithComments([post, comments]) {
      $('#post-title').text(post.title);
      $('#post-body').text(post.body);
      $('#post-comments').empty();

      for (let comment of comments) {

        $('#post-comments').append($('<li>').text(comment.text));
      }
    }
  }
}