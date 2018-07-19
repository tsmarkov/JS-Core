function validityCheck(arr) {
    let [x1, y1, x2, y2] = arr;

    let distStartToA = Math.sqrt(Math.pow((0 - x1), 2) + Math.pow((0 - y1), 2));
    let distStartToB = Math.sqrt(Math.pow((x2 - 0), 2) + Math.pow((y2 - 0), 2));
    let distAToB = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

    if (distStartToA === parseInt(distStartToA)) {
        console.log(`{${x1}, ${y1}} to {0, 0} is valid`);
    } else {
        console.log(`{${x1}, ${y1}} to {0, 0} is invalid`);
    }

    if (distStartToB === parseInt(distStartToB)) {
        console.log(`{${x2}, ${y2}} to {0, 0} is valid`);
    } else {
        console.log(`{${x2}, ${y2}} to {0, 0} is invalid`);
    }

    if (distAToB === parseInt(distAToB)) {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
    } else {
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
    }
}

validityCheck([3, 0, 0, 4]);