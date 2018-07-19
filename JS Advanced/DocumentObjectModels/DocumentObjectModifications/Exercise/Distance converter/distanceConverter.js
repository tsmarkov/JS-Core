function attachEventsListeners() {
    let distanceObj = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

    let button = document.getElementById('convert');
    button.addEventListener('click', convert);

    function convert() {
        let inputUnits = document.querySelector('#inputUnits').options[document.querySelector('#inputUnits').selectedIndex].value;
        let outputUnits = document.querySelector('#outputUnits').options[document.querySelector('#outputUnits').selectedIndex].value;

        let inputUserValue = Number(document.getElementById('inputDistance').value);
        let output = inputUserValue * distanceObj[inputUnits] / distanceObj[outputUnits];

        document.getElementById('outputDistance').value = output;
    }
}