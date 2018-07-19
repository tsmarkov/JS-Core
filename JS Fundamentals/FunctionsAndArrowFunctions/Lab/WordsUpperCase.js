function upperCase(input) {
    const reg = new RegExp(/\w+/g);

    let output = [];
    output = input.match(reg);

    for (let i = 0; i < output.length; i++) {
        output[i] = output[i].toUpperCase();
    }

    return output.join(', ');
}