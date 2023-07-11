function getLocalDate(timestamp, timezone) {
    const currentTime = new Date(timestamp * 1000);
    const timezoneOffset = currentTime.getTimezoneOffset() * 60 * 1000 + timezone * 1000;
    const adjustedTime = new Date(currentTime.getTime() + timezoneOffset);
    return adjustedTime;
}


/** external functions **/ 

export function getDate(timestamp, timezone) {
    const dateTime = getLocalDate(timestamp, timezone);
    const options = { weekday: 'long'};

    const currentDay = getLocalDate(Date.now() /1000, timezone).getDay();
    if (dateTime.getDay() == currentDay) {
        return 'Today';
    }
    
    return dateTime.toLocaleString('en-GB', options);
}

export function getTime(timestamp, timezone) {
    const dateTime = getLocalDate(timestamp, timezone);
    return dateTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

export function formatTemp(num) {
    return (Math.round(num * 10) / 10).toFixed(1).replace(".", ",");
}