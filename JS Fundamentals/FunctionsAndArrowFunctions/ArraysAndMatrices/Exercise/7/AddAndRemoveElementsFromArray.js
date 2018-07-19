function addAndRemoveElements(arr) {
    let num = 1;

    let result = [];
    for (let command of arr) {
        if (command === 'add') {
            result[result.length] = num++;
        } else if (command === 'remove') {
            result.splice(result.length - 1);
            num++;
        }
    }

    return result.length > 0 ? result.join('\n') : 'Empty';
}