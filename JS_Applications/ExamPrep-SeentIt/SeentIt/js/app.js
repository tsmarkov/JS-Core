$(() => {
    const HEADER = './templates/common/header.hbs';
    const FOOTER = './templates/common/footer.hbs';
    const NAVIGATION = './templates/common/navigation.hbs';

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', getWelcomePage);
        this.get('#/home', getWelcomePage);

        this.post('#/register', registerUser);

        this.post('#/login', loginUser);

        this.get('#/logout', logoutUser);

        this.get('#/catalog', displayCatalog);

        this.get('#/create/post', displaySubmitPost);
        this.post('#/create/post', submitPost);

        this.get('#/edit/post/:id', displayEditPost);
        this.post('#/edit/post', editPost);

        this.get('#/delete/post/:id', deletePost);

        this.get('#/my_posts', displayMyPosts);

        this.get('#/details/:postId', displayCommentsPage);

        this.post('#/create/comment', submitComment);

        this.get('#/comment/delete/:id', deleteComment);

        function getWelcomePage(ctx) {
            if (!auth.isAuth()) {
                ctx.isAuth = auth.isAuth();

                ctx.loadPartials({
                    header: HEADER,
                    footer: FOOTER,
                    loginForm: './templates/forms/loginForm.hbs',
                    registerForm: './templates/forms/registerForm.hbs'
                }).then(function () {
                    this.partial('./templates/main/welcomePage.hbs')
                }).catch(notify.handleError)
            } else {
                ctx.redirect('#/catalog')
            }
        }

        function registerUser(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            if (!/^[a-zA-Z]{3,}$/.test(username)) {
                notify.showError('Username should be at least 3 characters long and contains only english alphabet letters')
            } else if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
                notify.showError('Password should be at least 6 characters long and could contains only english alphabet letters and digits')
            } else if (password !== repeatPass) {
                notify.showError('Passwords should match')
            } else {
                auth.register(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        notify.showInfo('Register successful');
                        auth.login(username, password)
                            .then(() => ctx.redirect('#/catalog'))
                            .catch(notify.handleError)
                    })
                    .catch((err) => {
                        console.error(err);
                        notify.showInfo('Register failed')
                    })
            }
        }

        function loginUser(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then((userData) => {
                    auth.saveSession(userData);
                    notify.showInfo('Login successful');
                    ctx.redirect('#/catalog');
                })
                .catch((err) => {
                    console.error(err);
                    notify.showInfo('Login failed')
                })
        }

        function logoutUser(ctx) {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    notify.showInfo('Logout successful');
                    ctx.redirect('#/home');
                })
                .catch(notify.handleError)
        }

        function displayCatalog(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home')
            } else {
                posts.getAllPosts()
                    .then(function (posts) {
                        for (let i = 0; i < posts.length; i++) {
                            let currentPost = posts[i];

                            currentPost.rank = i + 1;
                            currentPost.date = calcTime(currentPost._kmd.ect);
                            currentPost.isAuthor = currentPost._acl.creator === sessionStorage.getItem('userId');
                        }

                        ctx.isAuth = auth.isAuth();
                        ctx.username = sessionStorage.getItem('username');
                        ctx.posts = posts;

                        ctx.loadPartials({
                            header: HEADER,
                            footer: FOOTER,
                            navigation: NAVIGATION,
                            post: './templates/posts/post.hbs'
                        }).then(function () {
                            this.partial('./templates/posts/catalogPage.hbs')
                        })
                    }).catch(notify.handleError)
            }
        }

        function displaySubmitPost(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');

                ctx.loadPartials({
                    header: HEADER,
                    footer: FOOTER,
                    navigation: NAVIGATION
                }).then(function () {
                    this.partial('./templates/posts/submitPage.hbs');
                }).catch(notify.handleError)
            }
        }

        function submitPost(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                let author = sessionStorage.getItem('username');
                let url = ctx.params.url;
                let title = ctx.params.title;
                let image = ctx.params.image;
                let comment = ctx.params.comment;

                if (!/^http.+/.test(url)) {
                    notify.showError('Invalid url')
                } else if (!title) {
                    notify.showError('Invalid title')
                } else {
                    posts.createPost(author, title, comment, url, image)
                        .then(function () {
                            notify.showInfo('Post created');
                            ctx.redirect('#/catalog');
                        }).catch(notify.handleError)
                }
            }
        }

        function displayEditPost(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');

                posts.postDetails(this.params.id)
                    .then(function (post) {
                        ctx.post = post;

                        ctx.loadPartials({
                            header: HEADER,
                            footer: FOOTER,
                            navigation: NAVIGATION
                        }).then(function () {
                            this.partial('./templates/posts/editPage.hbs');
                        })
                    })
                    .catch(notify.handleError);
            }
        }

        function editPost(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                let id = ctx.params.id;
                let author = sessionStorage.getItem('username');
                let url = ctx.params.url;
                let title = ctx.params.title;
                let image = ctx.params.image;
                let description = ctx.params.description;

                if (!/^http.+/.test(url)) {
                    notify.showError('Invalid url')
                } else if (!title) {
                    notify.showError('Invalid title')
                } else {
                    posts.editPost(author, title, description, url, image, id)
                        .then(function () {
                            notify.showInfo(`Post ${title} updated`);
                            ctx.redirect('#/catalog')
                        })
                        .catch(notify.handleError)
                }
            }
        }

        function deletePost(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                let id = ctx.params.id;

                posts.deletePost(id)
                    .then(function () {
                        notify.showInfo('Post deleted');
                        ctx.redirect('#/catalog');
                    })
                    .catch(notify.handleError)
            }
        }

        function displayMyPosts(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                let username = sessionStorage.getItem('username');

                posts.myPosts(username)
                    .then(function (posts) {
                        for (let i = 0; i < posts.length; i++) {
                            let currentPost = posts[i];

                            currentPost.rank = i + 1;
                            currentPost.date = calcTime(currentPost._kmd.ect);
                            currentPost.isAuthor = currentPost._acl.creator === sessionStorage.getItem('userId');
                        }

                        ctx.isAuth = auth.isAuth();
                        ctx.username = sessionStorage.getItem('username');
                        ctx.posts = posts;

                        ctx.loadPartials({
                            header: HEADER,
                            footer: FOOTER,
                            navigation: NAVIGATION,
                            post: './templates/posts/post.hbs'
                        }).then(function () {
                            this.partial('./templates/posts/myPostsPage.hbs')
                        })
                    })
                    .catch(notify.handleError)
            }
        }

        function displayCommentsPage(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                let postId = ctx.params.postId;

                const post = posts.postDetails(postId);
                const allComments = comments.getComments(postId);

                Promise.all([post, allComments])
                    .then(([post, allComments]) => {
                        post.date = calcTime(post._kmd.ect);
                        for (let i = 0; i < allComments.length; i++) {
                            let currentComment = allComments[i];
                            currentComment.date = calcTime(currentComment._kmd.ect);
                            currentComment.isAuthor = currentComment._acl.creator === sessionStorage.getItem('userId');
                        }

                        ctx.isAuth = auth.isAuth();
                        ctx.username = sessionStorage.getItem('username');
                        ctx.post = post;
                        ctx.comments = allComments;

                        ctx.loadPartials({
                            header: HEADER,
                            footer: FOOTER,
                            navigation: NAVIGATION,
                            comment: './templates/comments/comment.hbs',
                            addCommentForm: './templates/comments/addCommentForm.hbs',
                            commentSectionPost: './templates/comments/commentSectionPost.hbs'
                        }).then(function () {
                            this.partial('./templates/comments/commentsPage.hbs');
                        })
                    })
                    .catch(notify.handleError);
            }
        }

        function submitComment(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                let postId = ctx.params.postId;
                console.log(postId);
                let content = ctx.params.content;
                let author = sessionStorage.getItem('username');

                comments.createComment(author, content, postId)
                    .then(function () {
                        location.reload();
                        notify.showInfo('Comment created');
                    })
                    .catch(notify.handleError);
            }
        }

        function deleteComment(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
            } else {
                let commentId = ctx.params.id;

                comments.deleteComment(commentId)
                    .then(function () {
                        notify.showInfo('Comment deleted');
                        window.history.back();
                    })
                    .catch(notify.handleError)
            }
        }

        //HELPERS
        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);

            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }
    });

    app.run();
});