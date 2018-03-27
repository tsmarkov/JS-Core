function coneVolumeAndArea(radius, height) {
    let volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    let l = Math.PI * radius * Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2));
    let b = Math.PI * Math.pow(radius, 2);
    let area = l + b;

    console.log("volume = " + volume.toFixed(4));
    console.log("area = " + area.toFixed(4));
}

coneVolumeAndArea(3, 5);
