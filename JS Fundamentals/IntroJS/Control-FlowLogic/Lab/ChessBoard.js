function createChessBoard(n) {
    let html = '<div class="chessboard">\n';

    for (let i = 0; i < n; i++) {
        html += '  <div>\n'

        for (let j = 0; j < n; j++) {
            if (i % 2 === 0) {
                html += `    <span class="${j % 2 === 0 ? 'black' : 'white'}"></span>\n`;
            } else {
                html += `    <span class="${j % 2 === 0 ? 'white' : 'black'}"></span>\n`;
            }
        }

        html += '  </div>\n'
    }

    html += '</div>\n';

    return html;
}

console.log(createChessBoard(3));