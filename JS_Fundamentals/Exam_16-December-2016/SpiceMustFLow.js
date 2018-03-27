function spiceMustFlow(arr = []) {
    let currentYield = Number(arr[0]);
    let totalYield = 0;

    let days = 0;

    while (currentYield >= 100) {
        totalYield += currentYield;
        totalYield -= totalYield >= 26 ? 26 : totalYield;
        currentYield -= 10;
        days++;
    }

    totalYield -= totalYield >= 26 ? 26 : totalYield;

    return `${days}` +
        `\n` +
        `${totalYield}`;
}

console.log(
    spiceMustFlow(['111'])
);