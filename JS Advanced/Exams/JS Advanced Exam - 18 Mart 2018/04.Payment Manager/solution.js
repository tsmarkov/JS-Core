class PaymentManager {
    constructor(title) {
        this.title = title;
        this.tbody = null;
        this.table = this._createElement();
    }

    render(id) {
        $("#" + id).append($(this.table));
    }

    _addRow() {
        let name = this.table.find('input[name="name"]');
        let category = this.table.find('input[name="category"]');
        let price = this.table.find('input[name="price"]');

        if (name.val().trim() !== "" && category.val().trim() !== "" && price.val().trim() !== "") {
            let deleteBtnTd = $('<td></td>');
            let deleteBtn = $('<button>Delete</button>').click(this._deleteRow);

            // let priceFormated = this._format(price.val());

            let tr = $(`<tr><td>${name.val()}</td><td>${category.val()}</td><td>${Number(price.val())}</td></tr>`);

            deleteBtnTd.append(deleteBtn);
            tr.append(deleteBtnTd);

            name.val("");
            category.val("");
            price.val("");
            this.tbody.append(tr);

        }
    }

    _deleteRow() {
        $(this.parentNode.parentNode).remove();
    }

    _createElement() {
        let table = $('<table>');
        let caption = $(`<caption>${this.title} Payment Manager</caption>`);
        let thead = $(`<thead></thead>`);

        let theadRow = $(`<tr>
            <th class="name">Name</th>
            <th class="category">Category</th>
            <th class="price">Price</th>
            <th>Actions</th>
        </tr>`);

        let tbody = $(`<tbody class="payments"></tbody>`);

        //TODO: tr (tableRows) with tds for payment name -> payment category -> payment price -> delete

        let tfoot = $(`<tfoot class="input-data"></tfoot>`);
        let tfootTr = $(`<tr>
            <td><input name="name" type="text"></td>
            <td><input name="category" type="text"></td>
            <td><input name="price" type="number"></td>
            </tr>`);
        let tdForAddButton = $(`<td></td>`);
        let addBtn = $(`<button>Add</button>`).click(this._addRow.bind(this));

        thead.append(theadRow);
        //TODO: tbody appends?
        tdForAddButton.append(addBtn);
        tfootTr.append(tdForAddButton);
        tfoot.append(tfootTr);

        table.append(caption);
        table.append(thead);
        table.append(tbody);
        table.append(tfoot);

        //TODO: Ask - is invalid?
        this.tbody = tbody;
        return table;
    }
}