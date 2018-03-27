class Dialog {
    constructor(textMessage, callback) {
        this.message = textMessage;
        this.callback = callback;
        this._element = null;
        this._inputs = [];
        this._params = {};
    }

    addInput(label, name, type) {
        this._inputs.push({label: label, name: name, type: type});
    }

    render() {
        this._createElement();
        $('body').append(this._element);
    }

    _ok() {
        let inputs = this._element.find('input').toArray();
        for (let obj of inputs) {
            let name = $(obj).attr('name');
            this._params[name] = $(obj).val();
        }

        this.callback(this._params);
        this._cancel();
    }

    _cancel() {
        this._element.remove();
    }

    _createElement() {
        let overlay = $(`<div class="overlay"></div>`);
        let dialog = $(`<div class="dialog"></div>`);
        let paragraph = $(`<p>${this.message}</p>`);

        dialog.append(paragraph);

        for (let inputObj of this._inputs) {
            let currentLabel = $(`<label>${inputObj.label}</label>`);
            let currentInput = $(`<input name="${inputObj.name}" type="${inputObj.type}">`);

            dialog.append(currentLabel);
            dialog.append(currentInput);
        }

        let okBtn = $('<button>OK</button>').click(this._ok.bind(this));
        let cancelBtn = $('<button>Cancel</button>').click(this._cancel.bind(this));
        dialog.append(okBtn);
        dialog.append(cancelBtn);

        overlay.append(dialog);

        this._element = overlay;
    }
}