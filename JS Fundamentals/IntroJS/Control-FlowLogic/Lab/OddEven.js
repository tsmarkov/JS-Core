function oddEven(a) {
    if (a !== parseInt(a)) {
        return "invalid";
    } else if (a % 2 === 0) {
        return "even";
    } else if (a % 2 !== 0) {
        return "odd";
    }
}

