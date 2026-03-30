// Hora formatada na header
const formattedHours = () => {
    let divHours = document.getElementById('hours-header')
    const date = new Date()

    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }
    const dateFormatted = new Intl.DateTimeFormat('pt-BR', dateOptions).format(date)
    const hoursOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }
    const hourFormatted = new Intl.DateTimeFormat('pt-BR', hoursOptions).format(date)

    const timeString = `${dateFormatted} • ${hourFormatted}`
    divHours.textContent = timeString
}
setInterval(formattedHours, 1000)
formattedHours()
