function variableNameMatch(str) {
    let matches = [];

    let reg = new RegExp('\\b_([a-zA-Z0-9]+)\\b', 'gm');
    let match = reg.exec(str);
    
    while (match !== null) {
        matches.push(match[1]);
        match = reg.exec(str);
    }

    return matches.join(',')
}