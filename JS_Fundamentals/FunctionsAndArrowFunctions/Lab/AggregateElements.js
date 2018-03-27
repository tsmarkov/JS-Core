function aggregateElements(arr) {
    let sum = 0;
    let inverseSum = 0;
    let concated = '';

    for (let obj of arr) {
        sum += obj;
        inverseSum += (1 / obj);
        concated += obj;
    }

    console.log(sum);
    console.log(inverseSum);
    console.log(concated);
}