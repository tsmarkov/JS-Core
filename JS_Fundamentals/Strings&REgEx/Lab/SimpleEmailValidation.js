function simpleEmailValidation(email) {
    return /^([A-Za-z0-9]+@[a-z]+\.[a-z]+)$/.test(email) ? 'Valid' : 'Invalid'
}