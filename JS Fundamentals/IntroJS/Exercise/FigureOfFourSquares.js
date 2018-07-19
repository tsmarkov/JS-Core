//90/100

function figureOfFourSquares(n) {
    let figure = '';

    let dashes = '-'.repeat(n - 2);
    let spaces = ' '.repeat(n - 2);

    let verticalBarCount = n % 2 === 0 ? n - 1 : n;
    verticalBarCount = (verticalBarCount - 3) / 2;
    verticalBarCount = verticalBarCount < 0 ? 0 : verticalBarCount;

    for (let i = 0; i < 2; i++) {
        figure += `+${dashes}+${dashes}+\n`;

        for (let j = 0; j < verticalBarCount; j++) {
            figure += `|${spaces}|${spaces}|\n`;
        }
    }

    figure += `+${dashes}+${dashes}+\n`;

    return figure;
}
