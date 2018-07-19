function multiplicator(n) {
    let html = '<table border="1">\n';

    for (let i = 0; i <= n; i++) {
        if (i !== 0) {
            html += `<tr><th>${i}</th>`;

            for (let k = 1; k * i <= i * n; k++) {
                html += `<td>${k*i}</td>`
            }

            html += '</tr>\n';
        } else {
            html += '<tr><th>x</th>';

            for (let j = 1; j <= n; j++) {
                html += `<th>${j}</th>`
            }

            html += '</tr>\n';
        }
    }

    html += '</table>\n';

    return html;
}
