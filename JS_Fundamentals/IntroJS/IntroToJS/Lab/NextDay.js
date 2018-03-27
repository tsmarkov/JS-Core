function nextDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    let oneDay = 24 * 60 * 60 * 1000;

    let newDay = new Date(date.getTime() + oneDay);

    return newDay.getFullYear() + "-" + (newDay.getMonth() + 1) + "-" + newDay.getDate();
}

console.log(nextDay(2016, 9, 30));