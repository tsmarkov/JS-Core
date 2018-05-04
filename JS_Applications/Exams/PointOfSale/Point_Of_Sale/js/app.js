$(() => {
    const app = Sammy('#container', function () {
        const HEADER = './templates/common/header.hbs';
        const FOOTER = './templates/common/footer.hbs';

        this.use('Handlebars', 'hbs');

        this.get('index.html', displayWelcomePage);
        this.get('#/welcome', displayWelcomePage);

        this.post('#/register', registerUser);

        this.post('#/login', loginUser);

        this.get('#/logout', logoutUser);

        this.get('#/home', displayHome);
        this.get('#/currentReceipt', displayHome);

        function displayWelcomePage(ctx) {
            ctx.isAuth = auth.isAuth();

            ctx.loadPartials({
                header: HEADER,
                footer: FOOTER,
                loginForm: './templates/forms/loginForm.hbs',
                registerForm: './templates/forms/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/welcome.hbs');
            }).catch(notify.handleError)
        }

        function registerUser(ctx) {
            let username = ctx.params['username-register'];
            let password = ctx.params['password-register'];
            let repeatPass = ctx.params['password-register-check'];

            if (!/^\w{5,}$/.test(username)) {
                notify.showError('Username must be at least 5 characters long');
            } else if (password.trim() === '') {
                notify.showError('Password must not be empty');
            } else if (password !== repeatPass) {
                notify.showError('Passwords must match');
            } else {
                auth.register(username, password)
                    .then((userData) => {
                        auth.saveSession(userData);
                        notify.showInfo('Register successful');
                        auth.login(username, password)
                            .then(() => ctx.redirect('#/home'))
                            .catch(notify.handleError)
                    })
                    .catch((err) => {
                        console.error(err);
                        notify.showError('Register failed')
                    })
            }
        }

        function loginUser(ctx) {
            let username = ctx.params['username-login'];
            let password = ctx.params['password-login'];

            auth.login(username, password)
                .then((userData) => {
                    auth.saveSession(userData);
                    notify.showInfo('Login successful');
                    ctx.redirect('#/home');
                })
                .catch((err) => {
                    console.error(err);
                    notify.showError('Login failed')
                })
        }

        function logoutUser(ctx) {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    notify.showInfo('Logout successful');
                    ctx.redirect('#/welcome');
                })
                .catch(notify.handleError)
        }

        function displayHome(ctx) {
            if (!auth.isAuth()) {
                ctx.redirect('#/welcome');
                return;
            }

            receipts.getActiveReceipt()
                .then((receipt) => {
                    if (receipt.length <= 0) {
                        receipts.createReceipt();
                        location.reload();
                    } else {
                        entries.getEntriesByReceiptId(receipt._id)
                            .then((etnries) => {
                                ctx.isAuth = auth.isAuth();
                                ctx.username = sessionStorage.getItem('username');

                                ctx.loadPartials({
                                    header: HEADER,
                                    footer: FOOTER
                                }).then(function () {
                                    this.partial('./templates/receipts/createReceipt.hbs')
                                })
                            })
                    }
                })
                .catch(console.error)
        }


        //if (!auth.isAuth()) {
        //  ctx.redirect('#/welcome');
        //  return;
        //}
    });

    app.run();
});