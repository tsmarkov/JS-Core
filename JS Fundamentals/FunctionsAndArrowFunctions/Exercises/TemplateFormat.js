function templateFormat(arr) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<quiz>\n';

    for (let i = 0; i < arr.length; i += 2) {
        let question = arr[i];
        let answer = arr[i + 1];

        xml += '<question>\n' +
            `    ${question}\n` +
            '  </question>\n' +
            '  <answer>\n' +
            `    ${answer}\n` +
            '  </answer>\n';
    }

    xml += '</quiz>';

    return xml;
}