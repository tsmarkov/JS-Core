function tripLength(input) {
    let point1 = {
        x: input[0],
        y: input[1],
    };

    let point2 = {
        x: input[2],
        y: input[3],
    };

    let point3 = {
        x: input[4],
        y: input[5],
    };

    let distance12 = findDistance(point1, point2);
    let distance23 = findDistance(point2, point3);
    let distance13 = findDistance(point1, point3);

    let minDistance = [distance12, distance23, distance13].sort((a, b) => a - b).slice(0, 2).reduce((a, b) => a + b);

    if ((distance12 <= distance13) && (distance13 => distance23)) {
        console.log('1->2->3: ' + minDistance);
    } else if ((distance12 <= distance23) && (distance13 < distance23)) {
        console.log('2->1->3: ' + minDistance);
    } else {
        console.log('1->3->2: ' + minDistance);
    }


    function findDistance(firstPoint, secondPoint) {
        let distance = Math.sqrt((firstPoint.x - secondPoint.x) ** 2 + (firstPoint.y - secondPoint.y) ** 2);
        return distance;
    }
}

console.log(tripLength([5, 1, 1, 1, 5, 4]));


//function tripLength(arr) {
//    let [x1, y1, x2, y2, x3, y3] = arr;
//
//    //// let a = x1 + y1;
//    // let b = x2 + y2;
//    // let c = x3 + y3;
//
//    // let obj = {[a]: 1, [b]: 2, [c]: 3};
//
//    // let min = Math.min(a, b, c);
//    // let max = Math.max(a, b, c);
//    // let mid = Math.min(Math.max(a, c), Math.max(b, c), Math//.max(a, b));
//
//    let a = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
//    let b = Math.sqrt(Math.pow((x2 - x3), 2) + Math.pow((y2 - y3), 2));
//    let c = Math.sqrt(Math.pow((x1 - x3), 2) + Math.pow((y1 - y3), 2));
//
//    let minDist = Math.min(a, b, c);
//    let maxDist = Math.max(a, b, c);
//    let midDist = Math.min(Math.max(a, b), Math.max(b, c), Math.max(a, c));
//
//    let points = [];
//
//    if (minDist === a) {
//        points[0] = 1;
//    } else if (minDist === b) {
//        points[0] = 2;
//    } else if (minDist === c) {
//        points[0] = 3;
//    }
//
//    if (midDist === a && !points.includes(1)) {
//        points[1] = 1;
//    } else if (midDist === b && !points.includes(2)) {
//        points[1] = 2;
//    } else if (midDist === c && !points.includes(3)) {
//        points[1] = 3;
//    }
//
//    if (maxDist === a && !points.includes(1)) {
//        points[2] = 1;
//    } else if (maxDist === b && !points.includes(2)) {
//        points[2] = 2;
//    } else if (maxDist === c && !points.includes(3)) {
//        points[2] = 3;
//    }
//
//
//    return `${points.join('->')}: ${minDist + midDist}`;
//}

