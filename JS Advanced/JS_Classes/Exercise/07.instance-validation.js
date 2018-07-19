class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = clientId;
        this.email = email;
        this.fullName = [firstName, lastName];
    }

    get clientId() {
        return this._clientId;
    }

    set clientId(id) {
        if (!/^[0-9]{6}$/.test(id)) {
            throw TypeError("Client ID must be a 6-digit number")
        }

        this._clientId = id;
    }

    get email() {
        return this._email
    }

    set email(email) {
        if (!/^[a-zA-Z]+@[a-zA-Z.]+$/.test(email)) {
            throw TypeError("Invalid e-mail");
        }

        this._email = email;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(firstAndLastName) {
        const regex = /^[a-zA-Z]{3,20}$/;
        let [firstName, lastName] = firstAndLastName;

        if (firstName.length < 3 || firstName.length > 20) {
            throw TypeError(`First name must be between 3 and 20 characters long`);
        } else if (lastName.length < 3 || lastName.length > 20) {
            throw TypeError(`Last name must be between 3 and 20 characters long`);
        }

        if (!regex.test(firstName)) {
            throw TypeError("First name must contain only Latin characters")
        } else if (!regex.test(lastName)) {
            throw TypeError("Last name must contain only Latin characters")
        }

        this._fullName = firstName + " " + lastName;
    }
}

//TypeError: Client ID must be a 6-digit number
let invalidId = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov');


//TypeError: Invalid e-mail
let invalidEmail = new CheckingAccount('131455', 'ivan@', 'Ivan', 'Petrov');


//TypeError: First name must be between 3 and 20 characters long
let invalidFirstNameLength = new CheckingAccount('131455', 'ivan@some.com', 'I', 'Petrov');


//TypeError: "Last name must contain only Latin characters
let invalidLastNameContent = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov');
