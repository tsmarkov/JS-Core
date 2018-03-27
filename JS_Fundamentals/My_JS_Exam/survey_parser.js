function survey_parser(text) {
    //text = text.replace(/\n/, '');
    let startIndex = text.indexOf('<svg>');
    let end = text.indexOf('</svg>');
    if ((startIndex === -1 && end === -1)) {// || (startIndex > end)) {
        console.log('No survey found');
        return
    }
    
    let svgRegex = new RegExp('<svg>\\s*<cat>\\s*<text>.*?\\[(.+?)\\].*<\\/text>\\s*<\\/cat>\\s*<cat>\\s*(.*?)<\\/cat>\\s*<\\/svg>', 'gm')
    let svgMessageMatch = svgRegex.exec(text);

    if (svgMessageMatch !== null) {
        let svgMessage = svgMessageMatch[0];
        let surveyLabel = svgMessageMatch[1];
        let ratings = svgMessageMatch[2];

        let votesRegex = new RegExp('<g>\\s*<val>\\s*(\\d+)\\s*<\\/val>\\s*(\\d+)\\s*<\\/g>', 'gm');
        let validVotesMatches = votesRegex.exec(ratings);

        let allValidVotesCount = 0;
        let sum = 0.0;
        if (validVotesMatches !== null) {
            while (validVotesMatches !== null) {
                let value = Number(validVotesMatches[1]);
                let count = Number(validVotesMatches[2]);

                //POD VAPROS E!
                //Check it      <= or <      &     >= or > ??
                if (count >= 0 && (value >= 1 && value <= 10)) {
                    //if (count !== 0) {
                    sum += (value * count);
                    //}

                    allValidVotesCount += count;
                }

                validVotesMatches = votesRegex.exec(ratings);
            }
        } else {
            console.log('Invalid format');
            return;
        }

        let average = sum / allValidVotesCount;

        //average.toFixed(2)
        //Math.round(original*100)/100;
        console.log(`${surveyLabel}: ${Math.round(average * 100) / 100}`);

    } else {
        console.log('Invalid format');
    }
}

console.log(
    survey_parser(
        //INVALID//`<svg><cat><text>Which is your favourite meal from our selection?</text></cat><cat><g><val>Fish</val>15</g><g><val>Prawns</val>31</g><g><val>Crab Langoon</val>12</g><g><val>Calamari</val>17</g></cat></svg>`
        `<svg><cat><text>How do you rate the special menu? [Food - Special]</text></cat> <cat><g><val>1</val>5</g><g><val>5</val>13</g><g><val>10</val>22</g></cat></svg>`
        // `<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General] \n Kotka s Roga</text></cat><cat>\n<g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>Susam5</val>7</g></cat></svg><p>Some more random text</p>`
        //NO_SURVAY//`<p>How do you suggest we improve our service?</p><p>More tacos.</p><p>It's great, don't mess with it!</p><p>I'd like to have the option for delivery</p>`
        //`<svg><cat><text>Which is your favourite meal from our selection?</text></cat><cat><g><val>Fish</val>15</g><g><val>Prawns</val>31</g><g><val>Crab Langoon</val>12</g><g><val>Calamari</val>17</g></cat></svg>`
    )
);