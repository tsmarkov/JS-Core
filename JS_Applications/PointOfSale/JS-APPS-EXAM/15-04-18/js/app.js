$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/home', welcomePage);
        this.get('#/create', welcomePage);
        this.get('index.html', welcomePage);

        function welcomePage(ctx) {
            ctx.isAuth = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            if (ctx.isAuth) {
                ctx.redirect('')
            } else {
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    loginForm: './templates/forms/loginForm.hbs',
                    registerForm: './templates/forms/registerForm.hbs',
                }).then(function () {
                    this.partial('./templates/welcome/welcome-anonymous.hbs');
                });
            }
        }

        this.post('#/register', (ctx) => {
            let username = ctx.params['username-register'];
            let password = ctx.params['password-register'];
            let repeatPass = ctx.params['password-register-check'];

            if (!/^[A-Za-z]{5,}$/.test(username)) {
                notify.showError('Username should be at least 5 characters long!');
            } else if (password === "" && password === 'undefined' && password === null) {
                notify.showError('Password field should not be empty!');
            } else if (repeatPass !== password) {
                notify.showError('Passwords must match!');
            } else {
                auth.register(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        notify.showInfo('User registration successful!');

                        auth.login(username, password);
                        ctx.redirect('#/home');
                    })
                    .catch(notify.handleError);
            }
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params['username-login'];
            let password = ctx.params['password-login'];

            if (username === '' || password === '') {
                notify.showError('All fields should be non-empty!');
            } else {
                auth.login(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        notify.showInfo('Login successful.');
                        ctx.redirect('#/create');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/logout', (ctx) => {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    ctx.redirect('#/home');
                })
                .catch(notify.handleError);
        });


        this.get("#/create", function (ctx) {

        })
    });

    app.run();
});