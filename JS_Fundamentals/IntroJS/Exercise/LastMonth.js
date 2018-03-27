function lastDayOfLastMonth(yearParams) {
    let [day, month, year] = yearParams;

    let date = new Date(year, month - 1, 0);

    return date.getDate();
}