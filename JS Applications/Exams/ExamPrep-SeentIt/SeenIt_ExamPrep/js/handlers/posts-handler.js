let postsHandler = (() => {
    const HEADER = './templates/common/header.hbs';
    const FOOTER = './templates/common/footer.hbs';
    const NAVIGATION = './templates/common/navigation.hbs';

    function displayHome(ctx) {
        if (auth.isAuth()) {
            ctx.redirect('#/catalog');
        } else {
            ctx.loadPartials({
                header: HEADER,
                footer: FOOTER,
                loginForm: './templates/forms/loginForm.hbs',
                registerForm: './templates/forms/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/welcome.hbs');
            });
        }
    }

    function displayCatalog(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            posts.getAllPosts()
                .then(function (posts) {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.posts = posts;

                    for (let i = 0; i < posts.length; i++) {
                        let currentPost = posts[i];

                        currentPost.rank = i + 1;
                        currentPost.date = helpers.calcTime(currentPost._kmd.ect);
                        currentPost.isAuth = sessionStorage.getItem('username') === currentPost.author;
                    }

                    ctx.loadPartials({
                        header: HEADER,
                        footer: FOOTER,
                        navigation: NAVIGATION,
                        post: './templates/posts/post.hbs'
                    }).then(function () {
                        this.partial('./templates/posts/catalog.hbs');
                    });
                });
        }
    }

    function displayCreatePost(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: HEADER,
                footer: FOOTER,
                navigation: NAVIGATION,
                createPostForm: './templates/forms/createPostForm.hbs'
            }).then(function () {
                this.partial('./templates/posts/create.hbs');
            });
        }
    }

    function createPost(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let author = sessionStorage.getItem('username');
            let title = ctx.params.title;
            let description = ctx.params.description;
            let url = ctx.params.url;
            let image = ctx.params.image;

            if (author && title && url && url.indexOf('http') === 0) {
                posts.createPost(author, title, description, url, image)
                    .then(function () {
                        notify.showInfo(`Post "${title}" created`);
                        ctx.redirect('#/catalog');
                    })
                    .catch(notify.handleError);
            } else {
                notify.showError('Invalid parameters');
            }
        }
    }

    function displayEditPost(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let postId = ctx.params.id;

            posts.getPostById(postId)
                .then(function (post) {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.post = post;

                    ctx.loadPartials({
                        header: HEADER,
                        footer: FOOTER,
                        navigation: NAVIGATION,
                        editPostForm: './templates/forms/editPostForm.hbs'
                    }).then(function () {
                        this.partial('./templates/posts/edit.hbs');
                    });
                }).catch(notify.handleError);
        }
    }

    function editPost(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let author = sessionStorage.getItem('username');
            let title = ctx.params.title;
            let url = ctx.params.url;
            let imageUrl = ctx.params.image;
            let description = ctx.params.description;
            let postId = ctx.params.postId;

            if (author && title && url && url.indexOf('http') === 0) {
                posts.editPost(author, title, description, url, imageUrl, postId)
                    .then(function () {
                        notify.showInfo(`Post "${title}" edited`);
                        window.history.back();
                    }).catch(notify.handleError);
            } else {
                notify.showError('Invalid parameters');
            }
        }
    }

    function deletePost(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let postId = ctx.params.id;

            posts.deletePost(postId)
                .then(function () {
                    notify.showInfo('Post deleted');
                    ctx.redirect('#/catalog');
                }).catch(notify.handleError);
        }
    }

    function displayMyPosts(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            let username = sessionStorage.getItem('username');

            posts.getAllMyPosts(username)
                .then(function (posts) {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.posts = posts;

                    for (let i = 0; i < posts.length; i++) {
                        let currentPost = posts[i];

                        currentPost.rank = i + 1;
                        currentPost.date = helpers.calcTime(currentPost._kmd.ect);
                        currentPost.isAuth = sessionStorage.getItem('username') === currentPost.author;
                    }

                    ctx.loadPartials({
                        header: HEADER,
                        footer: FOOTER,
                        navigation: NAVIGATION,
                        post: './templates/posts/post.hbs'
                    }).then(function () {
                        this.partial('./templates/posts/catalog.hbs');
                    });
                });
        }
    }

    return {
        displayHome,
        displayCatalog,
        displayCreatePost,
        createPost,
        displayEditPost,
        editPost,
        deletePost,
        displayMyPosts,
    };
})();