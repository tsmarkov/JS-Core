function usernames(arr) {
    let result = [];

    for (let email of arr) {
        let parts = email.split(/[@\.]/);
        let resultName = parts[0] + '.';

        for (let i = 1; i < parts.length; i++) {
            resultName += parts[i][0];
        }

        result.push(resultName);
    }

    return result.join(', ');
}