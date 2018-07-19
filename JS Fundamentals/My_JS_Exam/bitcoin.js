function mining(arr = []) {
    arr = arr.map(n => Number(n));

    let firstBitcoinDay = null;
    let leva = 0;
    let bitcoinsCount = 0;

    for (let i = 0; i < arr.length; i++) {
        let dailyGold = (i + 1) % 3 === 0 ? arr[i] * 0.7 : arr[i];
        let dailyGoldToLev = dailyGold * 67.51;
        leva += dailyGoldToLev;

        while (leva >= 11949.16) {
            bitcoinsCount++;
            leva -= 11949.16;
        }

        if (firstBitcoinDay === null && bitcoinsCount > 0) {
            firstBitcoinDay = i + 1;
        }
    }

    console.log(`Bought bitcoins: ${bitcoinsCount}`);

    if (bitcoinsCount > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstBitcoinDay}`);
    }

    console.log(`Left money: ${leva.toFixed(2)} lv.`);
}

mining([100, 200, 300]);
//mining([50, 100]);
mining([3124.15, 504.212, 2511.124]);
