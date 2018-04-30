$(() => {
    const HEADER = './templates/common/header.hbs';
    const FOOTER = './templates/common/footer.hbs';
    const NAVIGATION = './templates/navigation/navigation.hbs';

    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/index.html', (ctx) => {
            ctx.isAuth = auth.isAuth();

            if (auth.isAuth()) {
                contacts.getAllContacts()
                    .then((data) => {
                        ctx.loadPartials({
                            header: HEADER,
                            footer: FOOTER,
                            navigation: NAVIGATION,
                            contacts: data,
                            contact: './templates/contacts/contact.hbs',
                            contactsPage: './templates/contacts/contactsPage.hbs',
                            contactDetails: './templates/contacts/contactDetails.hbs',
                            loginForm: './templates/forms/loginForm.hbs'
                        }).then(function () {
                            this.partial('./templates/welcome.hbs');
                        })
                    })
                    .catch(console.error)
            } else {
                ctx.loadPartials({
                    header: HEADER,
                    footer: FOOTER,
                    navigation: NAVIGATION,
                    loginForm: './templates/forms/loginForm.hbs'
                }).then(function () {
                    this.partial('./templates/welcome.hbs');
                })
            }
        });

        this.get('#/login', (ctx) => {
            if (auth.isAuth()) {
                ctx.redirect('#/contactsPage');
            } else {
                ctx.redirect('#/index.html');
            }
        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            auth.login(username, password)
                .then(async function (userData) {
                    await auth.saveSession(userData);
                    ctx.redirect('#/index.html');
                })
                .catch(function (err) {
                    alert('Register failed');
                    console.error(err);
                })
        });

        this.get('#/register', (ctx) => {
            ctx.loadPartials({
                header: HEADER,
                footer: FOOTER,
                navigation: NAVIGATION
            }).then(function () {
                this.partial('./templates/forms/registerForm.hbs')
            })
        });

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let passwordRepeat = ctx.params.passwordRepeat;

            if (password !== passwordRepeat) {
                alert('Passwords do not match');
            } else {
                auth.register(username, password)
                    .then(async function (userData) {
                        await auth.saveSession(userData);
                        ctx.redirect('#/index.html')
                    })
                    .catch(function (err) {
                        alert('Register failed');
                        console.error(err);
                    })
            }
        });

        this.get('#/logout', (ctx) => {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    ctx.redirect('#/index.html')
                })
                .catch(console.error);
        });
    });

    app.run();
});