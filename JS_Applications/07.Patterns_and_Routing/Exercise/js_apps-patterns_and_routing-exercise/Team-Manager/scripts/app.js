$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        //common patterns
        const header = './templates/common/header.hbs';
        const footer = './templates/common/footer.hbs';

        //--------HOME PAGE--------//
        this.get('/index.html', displayHome);
        this.get('#/home', displayHome);

        function displayHome(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            context
                .loadPartials({
                    header,
                    footer
                })
                .then(function () {
                    this.partial('./templates/home/home.hbs')
                });
        }

        //--------ABOUT PAGE--------//
        this.get('#/about', displayAbout);

        function displayAbout(context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            context
                .loadPartials({
                    header,
                    footer
                })
                .then(function () {
                    this.partial('./templates/about/about.hbs')
                });
        }

        //--------LOGIN PAGE--------//
        ////GET
        this.get('#/login', displayLogin);

        function displayLogin(context) {
            context.loadPartials({
                header,
                footer,
                'loginForm': './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        }

        ////POST
        this.post('#/login', login);

        function login(context) {
            let username = context.params.username;
            let pass = context.params.password;

            auth.login(username, pass)
                .then((userInfo) => {
                    auth.saveSession(userInfo);
                    auth.showInfo('Login successful');
                    displayHome(context);
                })
                .catch(() => {
                    auth.showError('Login failed')
                });
        }

        //--------REGISTER PAGE--------//
        ////GET
        this.get('#/register', displayRegister);

        function displayRegister(context) {
            context.loadPartials({
                header,
                footer,
                'registerForm': './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        }

        ////POST
        this.post('#/register', register);

        function register(context) {
            let username = context.params.username;
            let password = context.params.password;
            let passwordConfirm = context.params.repeatPassword;

            if (password !== passwordConfirm) {
                auth.showError(`Passwords don't match.\nPlease try again!`)
            } else {
                auth.register(username, password, passwordConfirm)
                    .then((data) => {
                        login(context);
                        auth.showInfo('Register successful');
                    })
                    .catch((err) => {
                        auth.showError(err.message);
                    })
            }
        }

        //--------LOGOUT--------//
        this.get('#/logout', logout);

        function logout(context) {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    displayHome(this);
                });
        }


        //--------CATALOG PAGE--------//
        this.get('#/catalog', displayCatalog);

        function displayCatalog(context) {
            let teams = teamsService.loadTeams();

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            context.teams = teams;

            context.loadPartials({
                header,
                footer,
                'team': './templates/catalog/team.hbs'
            }).then(function (ctx) {
                this.hasNoTeam = sessionStorage.getItem('teamId') === null ||
                    sessionStorage.getItem('teamId') === "undefined" ||
                    sessionStorage.getItem('teamId') === ''||
                    teams.length === 0;

                this.partial('./templates/catalog/teamCatalog.hbs');
            });
        }

        //TODO: implement teamService functionality
    });

    app.run();
});