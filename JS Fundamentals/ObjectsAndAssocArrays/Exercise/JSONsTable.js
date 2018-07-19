function JSONsTable(arr) {
    let html = '<table>\n';

    for (let json of arr) {
        html += '   <tr>\n';

        let obj = JSON.parse(json);
        for (let obj1 of Object.values(obj)) {
            html += `       <td>${obj1}</td>\n`;
        }

        html += '   <tr>\n';
    }

    html += '</table>';

    return html;
}