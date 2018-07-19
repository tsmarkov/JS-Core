function figureArea(w1, h1, w2, h2) {
    let innerFigureWidth = Math.min(w1, w2);
    let innerFigureHeight = Math.min(h1, h2);

    let innerFigure = innerFigureWidth * innerFigureHeight;
    let firstFigure = w1 * h1;
    let secondFigure = w2 * h2;

    console.log(firstFigure + secondFigure - innerFigure);
}

figureArea(1, 1.01, 1, 1);