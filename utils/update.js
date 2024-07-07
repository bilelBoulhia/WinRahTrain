import gun from "../Config/DbProvider";

const update = async (key) => {

    const list = gun.get(key)

    let newlist = []

   list.map().on((item,id)=>{


        newlist.push({id,...item})


    });


    return newlist
}

export default update