export const abbrevMonths = ["JAN", 'FEB', 'MAR', 'APR', 'MAY', "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getMMDDYYYY = date => {
    const month = months[date.getMonth()]
    return `${month} ${date.getUTCDate()}, ${date.getUTCFullYear()}`
}

export const getMMMYYYYY = date => {
    const month = abbrevMonths[date.getUTCMonth()]
    return `${month} ${date.getUTCFullYear()}`
}


export const getMMDD = date => {
    const month = abbrevMonths[date.getUTCMonth()]
    const day = date.getUTCDate()
    const formattedDay = day < 10 ? `0${day}` : day
    return `${month} ${formattedDay}`
}


