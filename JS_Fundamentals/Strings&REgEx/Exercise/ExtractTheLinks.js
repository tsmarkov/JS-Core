function linksExtract(arr) {
    let regex = new RegExp('www\\.[a-zA-Z0-9-]+(?:\\.[a-zA-Z]+)+', 'gm');

    for (let str of arr) {
        let matches = regex.exec(str);

        while (matches !== null) {
            console.log(matches[0]);
            matches = regex.exec(str);
        }
    }
}

linksExtract(
    [`Join WebStars now for free, at www.web-stars.com`,
        `You can also support our partners:`,
        `Internet - www.internet.com`,
        `WebSpiders - www.webspiders101.com`,
        `Sentinel - www.sentinel.-ko`]
)