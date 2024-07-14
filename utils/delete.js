import gun from "../Config/DbProvider";

const Delete = (key) => {
    gun.get(key).map().once((report, id) => {
        if (report) {
            gun.get(key).get(id).put(null);
        }
    });
};

export default Delete;

