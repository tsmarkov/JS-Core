function isPrime(n) {
    let prime = true;

    if (n > 1) {
        for (let i = 2; i <= n / 2; i++) {
            if (n % i === 0) {
                prime = false;
                break;
            }
        }
    } else {
        prime = false;
    }

    return prime;
}


