import { db, reference } from '../Config/DbProvider';
import {onValue, query, ref, orderByChild} from "firebase/database";

const get = (callback) => {


    const OrderByNewest = query(ref(db, reference),orderByChild('timestamp') )
    const unsubscribe =  onValue(OrderByNewest, (snapshot) => {
     const items = [];
     snapshot.forEach(childSnapshot => {
         items.push(childSnapshot.val());
     })


     callback(Object.values(items));
    });

    return()=>{
        unsubscribe();
    }

};

export default get;
