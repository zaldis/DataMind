export function dateToString(date, separator = ".", reversed=false) {
    const formattedDay = date.getDate().toString().padStart(2, "0");
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, "0");
    const formattedYear = date.getFullYear();
    if (reversed)
        return `${formattedYear}${separator}${formattedMonth}${separator}${formattedDay}`;
    return `${formattedDay}${separator}${formattedMonth}${separator}${formattedYear}`;
}
