const pad = (num) => num.toString().padStart(2, '0');

const DayTimeDeConstructor= (timestamp)=> {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = pad(date.getMinutes());
    return hours + ':' + minutes;
}
const DateDecConstructor= (timestamp)=> {
    if (!timestamp) return 'Invalid date';

    const date = new Date(timestamp);
    const day = date.getDate();
    console.log('day',day)
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export {DayTimeDeConstructor,DateDecConstructor}





/*a better code but not mine
* const formatDate = (date, options) => {
    if (!(date instanceof Date) || isNaN(date)) {
        return 'Invalid date';
    }

    const pad = (num) => num.toString().padStart(2, '0');

    const formatters = {
        time: () => `${pad(date.getHours())}:${pad(date.getMinutes())}`,
        full: () => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${formatters.time()}`
    };

    return formatters[options.format]();
};

export const DayTimeDeConstructor = (timestamp) => formatDate(new Date(timestamp), { format: 'time' });
export const DateDecConstructor = (timestamp) => formatDate(new Date(timestamp), { format: 'full' });*/