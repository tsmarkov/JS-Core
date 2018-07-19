function  imperialUnits(inputInches) {
    let foots = Number.parseInt(inputInches / 12);
    let inches = inputInches % 12;

    return `${foots}'-${inches}"`;
}