function cooking(params) {
    let number = params[0];
    params = params.slice(1);

    for (let obj of params) {
        number = operationsExecute(number, obj);

        console.log(number);
    }

    function operationsExecute(number, command) {
        switch (command) {
            case 'chop':
                return number /= 2;
            case 'dice':
                return Math.sqrt(number);
            case 'spice':
                return number + 1;
            case 'bake':
                return number * 3;
            case 'fillet':
                return number * 0.8;
        }
    }
}

cooking([9, 'dice', 'spice', 'chop', 'bake', 'fillet']);