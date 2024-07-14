import {DayTimeDeConstructor} from '../utils/Deconstructors'
class Report {
    constructor(station, destination, date = new Date().getTime()) {
        this.station = station;
        this.destination = destination;
        this.date = date;
        this.time = DayTimeDeConstructor(date);
    }
}



export default Report;
