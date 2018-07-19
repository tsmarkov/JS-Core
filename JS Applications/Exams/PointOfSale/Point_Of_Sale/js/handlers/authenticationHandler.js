let authHandler = (() => {
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
                .catch(notify.handleError)
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
            .catch(notify.handleError)
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

    return {
        loginUser,
        logoutUser,
        registerUser
    };
})();