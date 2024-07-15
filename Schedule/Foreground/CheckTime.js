import scheduleDelete from "../ScheduleDelete";
import { useEffect, useState } from "react";
import getLatest from "../../utils/newstItem";

const CheckTime = () => {
    const interval = 3 * 60 * 60 * 1000; //3hours
    const [timestamp, setTimestamp] = useState(null);

    const LatestTimestamp = async () => {
        const item = await getLatest('reports');
        setTimestamp(item.date);
    };

    const checkTime = async () => {
    await LatestTimestamp();
        if (timestamp) {
            scheduleDelete(timestamp, 'reports');
        }
    };

    useEffect(() => {
        LatestTimestamp();
        const intervalId = setInterval(checkTime, interval);
        return () => clearInterval(intervalId);
    }, []);


};

export default CheckTime;