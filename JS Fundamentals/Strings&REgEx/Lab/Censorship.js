function censorship(text, censored) {
    for (let censor of censored) {
        while (text.indexOf(censor) !== -1) {
            text = text.replace(censor, '-'.repeat(censor.length));
        }
    }

    return text;
}