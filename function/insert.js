import { set, ref,serverTimestamp } from 'firebase/database';
import { db,reference } from '../Config/DbProvider';
import uuid from 'react-native-uuid';
const insert = (report) => {


    set(ref(db, reference + uuid.v4() ), {
        station: report.station,
        destination: report.destination,
        time: report.time,
        timestamp: serverTimestamp()
    })
        .then(() => {
            console.log('Report inserted successfully');

        })
        .catch((error) => {
            console.error('Error inserting report:', error);

        });
    return true
};

export default insert;
