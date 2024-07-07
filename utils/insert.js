import gun from "../Config/DbProvider";


const insert = (key,report) => {

    gun.get(key).set(report);
};

export default insert;
