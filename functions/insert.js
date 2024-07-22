import { set, ref, serverTimestamp } from 'firebase/database';
import { db, REPORTS_REF } from '../Config/DbProvider';
import uuid from 'react-native-uuid';

const insert = (report, Ligne) => {
    const reportId = uuid.v4();
    const reportRef = ref(db, `${REPORTS_REF}/${Ligne}/${reportId}`);

    return set(reportRef, {
        station: report.station,
        destination: report.destination,
        time: report.time,
        timestamp: serverTimestamp()
    })
        .then(() => true)
        .catch(() => {
            return false;
        });
};

export default insert;