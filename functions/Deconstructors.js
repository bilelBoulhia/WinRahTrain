const pad = (num) => num.toString().padStart(2, '0');

const DayTimeDeConstructor= (timestamp)=> {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = pad(date.getMinutes());
    return hours + ':' + minutes;
}
const DateDecConstructor= (timestamp)=> {
    if (!timestamp) return 'Invalid date';

    const date = new Date(parseInt(timestamp));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export {DayTimeDeConstructor,DateDecConstructor}





