function evenPositionElements(arr) {
    //Variant 1:
    return arr.filter((el, i) => {
        return i % 2 === 0;
    }).join(' ');

    //Variant 2:
    // let evenPositions = [];
    // for (let i = 0; i < arr.length; i += 2) {
    //     evenPositions.push(arr[i]);
    // }
    // return evenPositions.join(' ');
}