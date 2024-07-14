import gun from "../Config/DbProvider";

const getLatest = (key, callback) => {

let lastitem = null;
const ref = gun.get(key)


const listener= ref.map().on((item,id)=> {

    if (item) {
        lastitem = {...item, id};
        callback(lastitem)
    }

});


    return () => {
        ref.off(listener);
    };
}

export default getLatest;
