function listBuilder(selector) {
    return {
        createNewList() {
            ul = $('<ul></ul>');

            let selectedElement = $(selector);
            selectedElement.empty();
            selectedElement.append(ul);

        },
        addItem(str) {
            let li = $(`<li></li>`);
            li.text(str);

            let upBtn = $(`<button>Up</button>`).click(function () {
                $(this.parentNode).insertBefore($(this.parentNode).prev());
            });

            let downBtn = $(`<button>Down</button>`).click(function () {
                $(this.parentNode).insertAfter($(this.parentNode).next());
            });

            li.append(upBtn);
            li.append(downBtn);

            $(ul).append(li);
        }
    }
}