function lastKNumbersSequence(n, k) {
    let sequence = [1];
    for (let i = 0; i < n - 1; i++) {
        let sum = 0;
        for (let j = sequence.length - k < 0 ? 0 : sequence.length - k; j < sequence.length; j++) {
            sum += sequence[j];
        }

        sequence.push(sum);
    }

    return sequence;
}