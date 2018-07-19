function galacticElections(arr = []) {
    let systems = {};

    for (let obj of arr) {
        if (!systems.hasOwnProperty(obj.system)) {
            systems[obj.system] = {};
        }

        if (!systems[obj.system].hasOwnProperty(obj.candidate)) {
            systems[obj.system][obj.candidate] = 0;
        }

        systems[obj.system][obj.candidate] += obj.votes;
    }

    let sortedSystemsWinnersAndVotesCount = Object.keys(systems).sort((a, b) => {
        let innerA = Object.values(systems[a]).reduce((x, y) => x + y);
        let innerB = Object.values(systems[b]).reduce((x, y) => x + y);
        return innerB - innerA;
    }).map(e => Object.assign({
        ['system']: [e],
        ['candidate']: `${Object.keys(systems[e]).sort((a, b) => systems[e][b] - systems[e][a])[0]}`,
        ['vote']: Object.values(systems[e]).reduce((x, y) => x + y)
    }));

    let mergedCandidates = mergeCandidates(sortedSystemsWinnersAndVotesCount);


    let totalVotes = sortedSystemsWinnersAndVotesCount.map(e => e['vote']).reduce((a, b) => a + b);
    let percentsFirst = (mergedCandidates[0]['vote'] * 100) / totalVotes;
    let percentsSecond = mergedCandidates.length > 1 ? (mergedCandidates[1]['vote'] * 100) / totalVotes : undefined;


    if (percentsFirst < 50 && percentsSecond !== undefined) {
        return `Runoff between ${sortedSystemsWinnersAndVotesCount[0]['candidate']} with ${Math.floor(percentsFirst)}% and ${sortedSystemsWinnersAndVotesCount[1]['candidate']} with ${Math.floor(percentsSecond)}%`
    }


    if (unopposedCandidate(sortedSystemsWinnersAndVotesCount)) {
        return `${sortedSystemsWinnersAndVotesCount[0]['candidate']} wins with ${totalVotes} votes\n${mergedCandidates[0]['candidate']} wins unopposed!`
    }

    return `${sortedSystemsWinnersAndVotesCount[0]['candidate']} wins with ${sortedSystemsWinnersAndVotesCount[0]['vote']} votes
Runner up: ${sortedSystemsWinnersAndVotesCount[1]['candidate']}
${sortedSystemsWinnersAndVotesCount.slice(1).map(s => `${s['system']}: ${s['vote']}`).join('\n')}`;

    function mergeCandidates(systemsCandidatesAndVotes) {
        let byCandidates = {};

        for (let obj of systemsCandidatesAndVotes) {
            if (!byCandidates.hasOwnProperty(obj['candidate'])) {
                byCandidates[obj['candidate']] = {candidate: obj['candidate'], vote: 0};
            }

            byCandidates[obj['candidate']]['vote'] += obj['vote'];
        }

        return Object.values(byCandidates);
    }

    function unopposedCandidate(sortedSystemsWinnersAndVotesCount) {
        let first = sortedSystemsWinnersAndVotesCount[0]['candidate'];
        for (let obj of sortedSystemsWinnersAndVotesCount) {
            if (obj['candidate'] !== first) {
                return false;
            }
        }
        return true;
    }
}

console.log(
    galacticElections([{system: 'Theta', candidate: 'Octocat', votes: 10},
        {system: 'Theta', candidate: 'Space Cow', votes: 10},
        {system: 'Theta', candidate: 'Huge Manatee', votes: 10},
        {system: 'Theta', candidate: 'Flying Shrimp', votes: 10},
        {system: 'Theta', candidate: 'Octocat', votes: 1},
        {system: 'Tau', candidate: 'Octocat', votes: 30},
        {system: 'Tau', candidate: 'Space Cow', votes: 30},
        {system: 'Tau', candidate: 'Huge Manatee', votes: 30},
        {system: 'Tau', candidate: 'Flying Shrimp', votes: 30},
        {system: 'Tau', candidate: 'Space Cow', votes: 1},
        {system: 'Sigma', candidate: 'Octocat', votes: 10},
        {system: 'Sigma', candidate: 'Space Cow', votes: 10},
        {system: 'Sigma', candidate: 'Huge Manatee', votes: 10},
        {system: 'Sigma', candidate: 'Flying Shrimp', votes: 10},
        {system: 'Sigma', candidate: 'Huge Manatee', votes: 1},
        {system: 'Omicron', candidate: 'Octocat', votes: 10},
        {system: 'Omicron', candidate: 'Space Cow', votes: 10},
        {system: 'Omicron', candidate: 'Huge Manatee', votes: 11},
        {system: 'Omicron', candidate: 'Flying Shrimp', votes: 10},
        {system: 'Omicron', candidate: 'Flying Shrimp', votes: 1},
        {system: 'Omega', candidate: 'Huge Manatee', votes: 10},
        {system: 'Theta', candidate: 'Octocat', votes: 1},
        {system: 'Sigma', candidate: 'Huge Manatee', votes: 2},
        {system: 'Tau', candidate: 'Octocat', votes: 10},
        {system: 'Omega', candidate: 'Huge Manatee', votes: 10},
        {system: 'Omega', candidate: 'Huge Manatee', votes: 10},
        {system: 'Omega', candidate: 'Huge Manatee', votes: 10},
        {system: 'Omega', candidate: 'Octocat', votes: 10}])
);

//Expected Output
//Octocat wins with 173 votes
//Runner up: Huge Manatee
//Omega: 50
//Sigma: 43
//Omicron: 42