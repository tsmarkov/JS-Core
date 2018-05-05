$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get("#/welcome", postsHandler.displayHome);
        this.get("/index.html", postsHandler.displayHome);

        this.post("#/login", authHandler.login);

        this.post("#/register", authHandler.register);

        this.get("#/logout", authHandler.logout);

        this.get("#/catalog", postsHandler.displayCatalog);

        this.get("#/create/post", postsHandler.displayCreatePost);
        this.post("#/create/post", postsHandler.createPost);

        this.get('#/edit/post/:id', postsHandler.displayEditPost);
        this.post('#/edit/post', postsHandler.editPost);

        this.get('#/delete/post/:id', postsHandler.deletePost);

        this.get('#/my_posts', postsHandler.displayMyPosts);

        this.get('#/comments/:id', commentsHandler.displayComments);

        this.post('#/create/comment', commentsHandler.createComment);

        this.get('#/delete/comment/:id', commentsHandler.deleteComment);
    });

    app.run();
});