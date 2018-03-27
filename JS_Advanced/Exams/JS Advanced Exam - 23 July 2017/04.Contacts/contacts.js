class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this._element = this.createElement();
        this.online = false;
    }


    get online() {
        return this._online;
    }

    set online(value) {
        if (value) {
            this._element.find('.title').addClass('online');
        } else {
            this._element.find('.title').removeClass('online');
        }

        this._online = value;
    }

    createElement() {
        let article = $('<article>');
        let titleDiv = $(`<div class="title">${this.firstName} ${this.lastName}</div>`);
        let infoDiv = $(`<div class="info" style="display: none"></div>`);
        let infoBtn = $('<button>&#8505;</button>').click(() => infoDiv.toggle());
        let phoneSpan = $(`<span>&phone; ${this.phone}</span>`);
        let emailSpan = $(`<span>&#9993; ${this.email}</span>`);

        titleDiv.append(infoBtn);
        infoDiv.append(phoneSpan);
        infoDiv.append(emailSpan);

        article.append(titleDiv);
        article.append(infoDiv);

        return article;
    }

    render(id) {
        $(`#${id}`).append(this._element);
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

// After 1 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);