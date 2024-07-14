import Delete from "../utils/delete";

function scheduleDelete(timestamp,key) {

    const _3_hours = 3;

    // if(timestamp !== Date.now() || getHourFromTimestamp(timestamp) + _3_hours > getHourFromTimestamp(Date.now())){
    //     return true
    // }
    if(timestamp !== Date.now() || getminuteFromTimestamp(timestamp) + _3_hours > getminuteFromTimestamp(Date.now())){
        Delete(key)
        return true

    }
}
function getHourFromTimestamp(timestamp) {
    let date = new Date(timestamp);
    return date.getHours()+1;
}
function getminuteFromTimestamp(timestamp) {
    let date = new Date(timestamp);
    return date.getMinutes();
}


export default scheduleDelete;