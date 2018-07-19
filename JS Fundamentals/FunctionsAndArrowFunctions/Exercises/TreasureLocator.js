function treasureLocator(coordinates) {

    for (let i = 0; i < coordinates.length; i += 2) {
        let y = coordinates[i];
        let x = coordinates[i + 1];

        checkIslands(x, y);
    }

    //TODO: Optimize code
    function checkIslands(x, y) {
        //let islands = {
        //    Tuvalu: {x1: 0, y1:  }//
        //}

        const tuvalu = {
            x1: 1,
            y1: 1,
            x2: 1,
            y2: 3,
            x3: 3,
            y3: 1,
            x4: 3,
            y4: 3
        };
        const tokelau = {
            x1: 0,
            y1: 8,
            x2: 0,
            y2: 9,
            x3: 1,
            y3: 8,
            x4: 1,
            y4: 9
        };
        const tonga = {
            x1: 6,
            y1: 0,
            x2: 6,
            y2: 2,
            x3: 8,
            y3: 0,
            x4: 8,
            y4: 2
        };
        const cook = {
            x1: 7,
            y1: 4,
            x2: 7,
            y2: 9,
            x3: 8,
            y3: 4,
            x4: 8,
            y4: 9
        };
        const samoa = {
            x1: 3,
            y1: 5,
            x2: 3,
            y2: 7,
            x3: 6,
            y3: 7,
            x4: 6,
            y4: 7
        };

        if (isInside(x, y, tuvalu)) {
            console.log('Tuvalu');
        } else if (isInside(x, y, tokelau)) {
            console.log('Tokelau');
        } else if (isInside(x, y, tonga)) {
            console.log('Tonga');
        } else if (isInside(x, y, cook)) {
            console.log('Cook');
        } else if (isInside(x, y, samoa)) {
            console.log('Samoa');
        } else {
            console.log('On the bottom of the ocean');
        }
    }

    function isInside(x, y, island) {
        return (x >= island['x1'] && x <= island['x4']) && (y >= island['y1'] && y <= island['y4']);
    }
}