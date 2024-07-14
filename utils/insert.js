import gun from "../Config/DbProvider";


const insert = (key,item) => {

    try {
        gun.get(key).set(item);
        return true
    } catch (e) {
        console.log(e);
        return false;
    }


};

export default insert;
