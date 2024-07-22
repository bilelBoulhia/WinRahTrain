import {DayTimeDeConstructor} from '../functions/Deconstructors'


class Report {
    constructor(station, destination) {

        this.station = station;
        this.destination = destination;
        this.time = DayTimeDeConstructor(new Date().getTime());
    }
}



export default Report;
