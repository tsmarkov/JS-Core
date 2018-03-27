function validate() {
    let userInfo = $('#userInfo');
    let username = $(userInfo).find('#username');
    let email = $(userInfo).find('#email');
    let password = $(userInfo).find('#password');
    let confirmPassword = $(userInfo).find('#confirm-password');
    let isCompany = $(userInfo).find('#company');
    let valid = $('#valid');

    isCompany.click(() => {
        if (companyChecked()) {
            $('#companyInfo').css('display', 'block');
        } else {
            $('#companyInfo').css('display', 'none');
        }
    });

    let submitBtn = $('#submit');
    submitBtn.click(function (event) {
        //alert(this.form.id);
        event.preventDefault();
    });

    submitBtn.click(validateInputFields);

    function validateInputFields() {
        let isUsernameValid = validUsername();
        let isEmailValid = validEmail();
        let isPasswordsValid = validPasswords();

        if (!isUsernameValid) {
            disableValidDisplay();
            username.removeAttr('style');
            username.css('border-color', '2px solid red');
        } else {
            username.removeAttr('style');
            username.css('border', 'none');
        }

        if (!isEmailValid) {
            disableValidDisplay();
            email.removeAttr('style');
            email.css('border-color', '2px solid red');
        } else {
            email.removeAttr('style');
            email.css('border', 'none');
        }

        if (!isPasswordsValid) {
            disableValidDisplay();
            password.removeAttr('style');
            confirmPassword.removeAttr('style');

            password.css('border-color', '2px solid red');
            confirmPassword.css('border-color', '2px solid red');
        } else {
            password.removeAttr('style');
            confirmPassword.removeAttr('style');

            password.css('border', 'none');
            confirmPassword.css('border', 'none');
        }

        let isCompanyChecked = companyChecked();

        if (!isCompanyChecked && isUsernameValid && isPasswordsValid && isEmailValid) {
            enableValidDisplay();
            $(submitBtn).submit( function(ev){
                $(this).unbind('submit').submit()
            });
        } else if (isCompanyChecked && isUsernameValid && isPasswordsValid && isEmailValid) {
            let companyNumber = $('#companyNumber');

            if (validCompanyNumber(companyNumber)) {
                companyNumber.removeAttr('style')
                enableValidDisplay();
                $(submitBtn).submit( function(ev){
                    $(this).unbind('submit').submit()
                });
            } else {
                companyNumber.css('border-color', 'red')
                disableValidDisplay()
            }
        }

       if (validCompanyNumber($('#companyNumber'))) {
           $('#companyNumber').removeAttr('style')
       }
    }

    function validCompanyNumber(companyNumberInput) {
        let companyNumber = Number(companyNumberInput.val());

        return companyNumber >= 1000 & companyNumber <= 9999;
    }

    function validUsername() {
        return /^[a-zA-Z0-9]{3,20}$/.test(username.val());
    }

    function validEmail() {
        return /^[^@]+@[^@]+(?:\.[^@]+)+$/.test(email.val())
    }

    function validPasswords() {
        return /^\w{5,15}$/.test(password.val()) &&
            password.val() === confirmPassword.val();
    }

    function companyChecked() {
        return isCompany[0].checked === true;
    }

    function enableValidDisplay() {
        valid.css('display', 'block')
    }

    function disableValidDisplay() {
        valid.css('display', 'none')
    }
}