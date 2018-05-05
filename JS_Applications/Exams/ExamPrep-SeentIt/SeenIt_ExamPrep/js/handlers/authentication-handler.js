let authHandler = (() => {
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
            });
    }

    function register(ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;
        let repeatPass = ctx.params.repeatPass;

        if (password !== repeatPass) {
            notify.showError('Passwords must match');
        } else {
            auth.register(username, password)
                .then(function () {
                    auth.login(username, password)
                        .then(function (userData) {
                            auth.saveSession(userData);
                            notify.showInfo('Registration successful');
                            ctx.redirect('#/catalog');
                        });
                })
                .catch(notify.handleError);
        }
    }

    function logout(ctx) {
        auth.logout()
            .then(function () {
                sessionStorage.clear();
                notify.showInfo('Logout successful');
                ctx.redirect('#/welcome');
            })
            .catch(function () {
                notify.showError('Logout failed');
                ctx.redirect('#/welcome');
            });
    }

    return {
        register,
        login,
        logout
    };
})();