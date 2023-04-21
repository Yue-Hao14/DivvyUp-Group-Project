export const abbrevMonths = ["JAN", 'FEB', 'MAR', 'APR', 'MAY', "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getMMDDYYYY = date => {
    const month = months[date.getMonth()]
    return `${month} ${date.getDate()}, ${date.getFullYear()}`
}

export const getMMMYYYYY = date => {
    const month = abbrevMonths[date.getMonth()]
    return `${month} ${date.getFullYear()}`
}


export const getMMDD = date => {
    const month = abbrevMonths[date.getMonth()]
    const day = date.getDate()
    const formattedDay = day < 10 ? `0${day}` : day
    return `${month} ${formattedDay}`
}
