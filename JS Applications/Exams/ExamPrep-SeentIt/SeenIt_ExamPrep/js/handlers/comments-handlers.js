let commentsHandler = (() => {
    const HEADER = './templates/common/header.hbs';
    const FOOTER = './templates/common/footer.hbs';
    const NAVIGATION = './templates/common/navigation.hbs';

    function displayComments(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let postId = ctx.params.id;

            let postPromise = posts.getPostById(postId);
            let commentsPromise = comments.getAllCommentsByPostId(postId);

            Promise.all([postPromise, commentsPromise])
                .then(function ([post, comments]) {
                    post.date = helpers.calcTime(post._kmd.ect);

                    for (let i = 0; i < comments.length; i++) {
                        let currentComment = comments[i];
                        currentComment.isAuth = sessionStorage.getItem('username') === currentComment.author;
                        currentComment.date = helpers.calcTime(currentComment._kmd.ect);
                    }

                    ctx.post = post;
                    ctx.comments = comments;

                    ctx.loadPartials({
                        header: HEADER,
                        footer: FOOTER,
                        navigation: NAVIGATION,
                        comment: './templates/comments/comment.hbs',
                        addCommentForm: './templates/forms/addCommentForm.hbs',
                        detailedPost: './templates/posts/detailedPost.hbs'
                    }).then(function () {
                        this.partial('./templates/comments/comments.hbs');
                    });
                }).catch(notify.handleError);
        }
    }

    function createComment(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let author = sessionStorage.getItem('username');
            let postId = ctx.params.postId;
            let content = ctx.params.content;

            comments.createComment(author, content, postId)
                .then(function () {
                    notify.showInfo('Comment created');
                    location.reload();
                }).catch(notify.handleError);
        }
    }

    function deleteComment(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let commentId = ctx.params.id;

            comments.deleteComment(commentId)
                .then(function () {
                    notify.showInfo('Comment deleted');
                    window.history.back();
                }).catch(notify.handleError);
        }
    }

    return {
        displayComments,
        createComment,
        deleteComment
    };
})();