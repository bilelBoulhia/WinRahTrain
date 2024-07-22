import { db, REPORTS_REF } from '../Config/DbProvider';
import {onValue, query, ref, orderByChild} from "firebase/database";

const get = (Ligne,callback) => {

    const reportRef = ref(db, `${REPORTS_REF}/${Ligne}/`);
    const OrderByNewest = query(reportRef,orderByChild('timestamp') )
    const unsubscribe =  onValue(OrderByNewest, (snapshot) => {
     const items = [];
     snapshot.forEach(childSnapshot => {
         items.push(childSnapshot.val());
     })


        console.log('snapshot',snapshot)
        console.log('Ligne',Ligne)
        console.log('items',items)

     callback(Object.values(items));
    });

    return()=>{
        unsubscribe();
    }

};

export default get;
