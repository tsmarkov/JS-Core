function radar(params) {
    let [speed, area] = params;

    let overspeed = speed - getMaxSpeed(area);
    let infraction = getInfraction(overspeed);

    if (infraction !== null) {
        console.log(infraction);
    }

    //Helping functions
    function getInfraction(overspeed) {
        if (overspeed > 40) {
            return 'reckless driving';
        } else if (overspeed > 20) {
            return 'excessive speeding';
        } else if (overspeed > 0) {
            return 'speeding';
        } else {
            return null;
        }
    }

    function getMaxSpeed(area) {
        switch (area) {
            case 'residential':
                return 20;
            case 'city':
                return 50;
            case 'interstate':
                return 90;
            case 'motorway':
                return 130;
        }
    }
}

radar([90, 'motorway']);
