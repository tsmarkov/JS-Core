function XML_Messenger(input) {
    input = input.trim().replace(/\n/gm, '\\n')
    let regex = new RegExp('^<message (?:\\s*[a-z]+="[a-zA-Z0-9\\s\\.]+"\\s*)*>(.+?)<\\/message>$', 'gm')
    let match = regex.exec(input);

    if (match !== null) {
        regex = new RegExp(
            '(\\bto="[a-zA-Z0-9\\s\\.]+)"(?:.+)(\\bfrom="[a-zA-Z0-9\\s\\.]+)"|(\\bfrom="[a-zA-Z0-9\\s\\.]+)"(?:.+)(\\bto="[a-zA-Z0-9\\s\\.]+)"',
            'gm');

        let attributes = regex.exec(input);
        if (attributes === null) {
            return 'Missing attributes';
        }

        let from = undefined;
        let to = undefined;

        if (attributes[1] && attributes[2] !== undefined) {
            to = attributes[1].slice(4);
            from = attributes[2].slice(6);
        }
        else {
            from = attributes[3].slice(6);
            to = attributes[4].slice(4);
        }

        let bodyText = match[1].split('\\n');

        let html = `<article>
  <div>From: <span class="sender">${from}</span></div>
  <div>To: <span class="recipient">${to}</span></div>
  <div>\n`;

        for (let paragraph of bodyText) {
            html += `    <p>${paragraph}</p>\n`;
        }
        //<p>Same old, same old</p>

        html += `  </div>
</article>`;

        return html;
    } else {
        return "Invalid message format";
    }
}

console.log(
    XML_Messenger(
        `<message from="Pedro" to="Zaira" topic="Prxima Centauri discoveries">We have detected a distortion in the light patterns of Proxima Centauri.
It's likely this is a new rocky planet of approximately Earth-mass.
This is very exciting news!
Sincerely, Pedro Amado</message>`
    )
);