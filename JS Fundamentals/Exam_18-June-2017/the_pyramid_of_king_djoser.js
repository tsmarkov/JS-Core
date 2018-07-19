function pyramid(base, increment) {
    let stoneRequired = 0;
    let marbleRequired = 0;
    let lapisLazuliRequired = 0;
    let goldRequired = 0;
    let finalPyramidHeight = 0;

    let levelCounter = 1;
    let end = base % 2 === 0 ? 2 : 1;
    for (let i = base; i > end; i -= 2, levelCounter++) {
        let bulk = Math.pow((i - 2.0), 2);
        let outerLayer = ((i - 1.0) * 4.0);

        if (levelCounter % 5 === 0) {
            stoneRequired += bulk * increment;
            lapisLazuliRequired += outerLayer * increment;
        } else {
            stoneRequired += bulk * increment;
            marbleRequired += outerLayer * increment;
        }
    }
    goldRequired += Math.pow(end, 2) * increment;

    return `Stone required: ${Math.ceil(stoneRequired)}\n` +
        `Marble required: ${Math.ceil(marbleRequired)}\n` +
        `Lapis Lazuli required: ${Math.ceil(lapisLazuliRequired)}\n` +
        `Gold required: ${Math.ceil(goldRequired)}\n` +
        `Final pyramid height: ${Math.floor(levelCounter * increment)}`;
}

console.log(
    pyramid(5000, 1)
);