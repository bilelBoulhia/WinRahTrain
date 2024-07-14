import gun from "../Config/DbProvider";

const get =  (key,callback) => {
    const items = [];
    const reportsRef = gun.get(key);

    const listener = reportsRef.map().on((item, id) => {
        if (item) {
            items.push({ ...item, id });

        } else {

            const index = items.findIndex(i => i.id === id);
            if (index > -1) {
                items.splice(index, 1);
            }
        }
        callback([...items]);
    });



    return () => {
        reportsRef.off(listener);
    };
};
export default get;

