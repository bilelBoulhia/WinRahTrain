import gun from "../Config/DbProvider";
import Delete from "./delete";


const insert = (key,item) => {

    const _3_hours = 10800
    try {
        gun.get(key).set(item)
        return true
    } catch (e) {
        console.log(e);
        return false;
    }


};

export default insert;
