function htmlEscaping(listItemsArr) {
    let result = '<ul>\n';

    for (let i = 0; i < listItemsArr.length; i++) {
        result += '    <li>' + escape(listItemsArr[i]) + '</li>\n';
    }

    return result += '</ul>';

    function escape(str) {
        return str.replace(new RegExp(/&/, 'g'), '&amp;')
        .replace(new RegExp(/</, 'g'), '&lt;')
        .replace(new RegExp(/>/, 'g'), '&gt;')
        .replace(new RegExp(/"/, 'g'), '&quot;')
    }
}

console.log(htmlEscaping(
    ['<b>&da<\b>']
));
