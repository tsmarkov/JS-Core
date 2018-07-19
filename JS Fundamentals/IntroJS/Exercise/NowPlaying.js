function nowPlaying(params) {
    let [trackName, artistName, duration] = params;

    return `Now Playing: ${artistName} - ${trackName} [${duration}]`;
}
