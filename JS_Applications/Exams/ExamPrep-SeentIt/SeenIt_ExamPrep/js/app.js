$(() => {
    const HEADER = './templates/common/header.hbs';
    const FOOTER = './templates/common/footer.hbs';
    const NAVIGATION = './templates/common/navigation.hbs';

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get("/", displayHome);
        this.get("/index.html", displayHome);

        this.post("#/login", login);

        this.post("#/register", register);

        this.get("#/logout", logout);

        this.get("#/catalog", displayCatalog);

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
                    this.partial('./templates/welcome.hbs')
                }).catch(notify.handleError)
            }
        }

        function login(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(function (userData) {
                    auth.saveSession(userData);
                    notify.showInfo('Login successful');
                    ctx.redirect('#/catalog');
                })
                .catch(function () {
                    notify.showError('Login failed');
                    ctx.redirect('/');
                })
        }

        function register(ctx) {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            if (password !== repeatPass) {
                notify.showError('Passwords must match')
            } else {
                auth.register(username, password)
                    .then(function () {
                        auth.login(username, password)
                            .then(function (userData) {
                                auth.saveSession(userData);
                                notify.showInfo('Registration successful');
                                ctx.redirect('#/catalog');
                            })
                    })
                    .catch(notify.handleError)
            }
        }

        function logout() {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    notify.showInfo('Logout successful');
                })
                .catch(function () {
                    notify.showError('Logout failed');
                    ctx.redirect('/');
                })
        }

        function displayCatalog(ctx) {
            redirectAnonymous();

            ctx.isAuth = auth.isAuth();

            ctx.loadPartials({
                header: HEADER,
                footer: FOOTER,
                navigation: NAVIGATION
            }).then(function () {
                ctx.partial('./partial/posts/catalog.hbs');
            }).catch(notify.handleError)
        }

        function redirectAnonymous() {
            if (!auth.isAuth()) {
                ctx.redirect('/');
            }
        }
    });

    app.run();
});