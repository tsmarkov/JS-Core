function gradsToDegrees(n) {
    n -= n / 100 * 10;

    if (n < 0 || n >= 360) {
        let originalN = n;
        n = Math.abs((n % 360));

        if (originalN > 360) {
            n = 360 - (360 - n);
        } else if (originalN < 360 && n !== 0) {
           n = 360 - n;
        }
    }

    return n;
}