export const abbrevMonths = ["JAN", 'FEB', 'MAR', 'APR', 'MAY', "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getMMDDYYYY = date => {
    const month = months[date.getMonth()]
    return `${month} ${date.getUTCDate()}, ${date.getFullYear()}`
}
