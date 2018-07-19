let receiptsHandler = (() => {
    const HEADER = './templates/common/header.hbs';
    const FOOTER = './templates/common/footer.hbs';

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


    function displayHome(ctx) {
        if (!auth.isAuth()) {
            ctx.redirect('#/welcome');
        } else {
            receipts.getActiveReceipt()
                .then(function (receipt) {
                    if (receipt.length <= 0) {
                        receipts.createReceipt();
                        ctx.redirect('#/currentReceipt');
                    } else {
                        let receiptId = receipt[0]._id;

                        entries.getEntriesByReceiptId(receiptId)
                            .then(function (entries) {
                                console.log(entries[0]);

                                ctx.entries = entries[0];
                                ctx.isAuth = auth.isAuth();
                                // ctx.receipt = receipt[0];

                                ctx.loadPartials({
                                    header: HEADER,
                                    footer: FOOTER,
                                    entry: './templates/entries/entry.hbs'
                                }).then(function () {
                                    this.partial('./templates/receipts/receiptDetails.hbs')
                                })
                            })
                    }
                })
                .catch(notify.handleError)
        }
    }

    function _receiptsTotal(receipts) {
        let total = 0;

        for (let receipt of receipts) {
            total += receipt.subTotal;
        }

        return total;
    }

    return {
        displayHome,
        displayWelcomePage
    };
})();


/*
receipts.getActiveReceipt()
    .then((receipt) => {
        if (receipt.length <= 0) {
            receipts.createReceipt();
            location.reload();
        } else {
            entries.getEntriesByReceiptId(receipt._id)
                .then((entries) => {
                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.entries = entries;

                    ctx.loadPartials({
                        header: HEADER,
                        footer: FOOTER
                    }).then(function () {
                        this.partial('./templates/receipts/createReceipt.hbs')
                    })
                })
        }
    })
    .catch(notify.handleError)*/
