let authHandler = (() => {
    const FOOTER = './templates/common/footer.hbs';
    const NAVIGATION = './templates/common/navigation.hbs';

    function displayLogin(ctx) {
        if (auth.isAuth()) {
            ctx.redirect('#/flights');
            return;
        }

        ctx.loadPartials({
            navigation: NAVIGATION,
            footer: FOOTER
        }).then(function () {
            this.partial('./templates/forms/loginForm.hbs');
        })//.catch(notify.handleError)
    }

    function login(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.pass;

        if (!username.trim()) {
            notify.showError('Username should not be empty.');
        } else if (!password.trim()) {
            notify.showError('Password should not be empty.');
        } else {
            auth.login(username, password)
                .then(function (userData) {
                    auth.saveSession(userData);
                    notify.showInfo('Login successful.');
                    ctx.redirect('#/flights');
                })
                .catch(notify.handleError)
        }
    }

    function displayRegister(ctx) {
        if (auth.isAuth()) {
            ctx.redirect('#/flights');
            return;
        }

        ctx.loadPartials({
            navigation: NAVIGATION,
            footer: FOOTER
        }).then(function () {
            this.partial('./templates/forms/registerForm.hbs');
        }).catch(notify.handleError)
    }

    function register(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.pass;
        let repeatPass = ctx.params.checkPass;

        if (username.length < 5) {
            notify.showError('Username should be at least 5 characters long.')
        } else if (!password.trim() || !repeatPass.trim()) {
            notify.showError('Passwords input fields should not be empty.')
        } else if (password !== repeatPass) {
            notify.showError('Passwords should match.');
        } else {
            auth.register(username, password)
                .then(function () {
                    auth.login(username, password)
                        .then(function (userData) {
                            auth.saveSession(userData);
                            notify.showInfo('User registration successful.');
                            ctx.redirect('#/flights');
                        });
                })
                .catch(notify.handleError);
        }
    }

    function logout(ctx) {
        auth.logout()
            .then(function () {
                sessionStorage.clear();
                notify.showInfo('Logout successful.');
                ctx.redirect('#/login');
            })
            .catch(notify.handleError);
    }

    return {
        displayLogin,
        login,
        displayRegister,
        register,
        logout
    };
})();