function JSONtoHTML(input = []) {
    let myJSON = JSON.parse(input)

    let result = '<table>\n';
    result += ' <tr>'
    let firstRow = myJSON[0];

    for (const key of Object.keys(firstRow)) {
        result += `<th>${htmlEscape(key)}</th>`;
    }

    result += '</tr>\n'

    for (let i = 0; i < myJSON.length; i++) {
        result += ' <tr>'

        for (const value of Object.values(myJSON[i])) {

            result += `<td>${htmlEscape(String(value))}</td>`;

        }

        result += '</tr>\n'
    }

    result += '</table>'

    console.log(result);

    function htmlEscape(data) {
        return data.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}
