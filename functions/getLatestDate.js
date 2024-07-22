import { db,REPORTS_REF } from '../Config/DbProvider';
import {limitToLast, onValue, orderByChild, query, ref} from "firebase/database";


const getLatestDate = (Ligne,callback) => {
   const reportRef = ref(db, `${REPORTS_REF}/${Ligne}/`);
   const latestItem = query(reportRef, orderByChild('timestamp'), limitToLast(1));

   const unsubscribe= onValue(latestItem, (snapshot) => {

     snapshot.exists() ? callback(Object.values(snapshot.val())[0].timestamp) : callback(null)

   });

   return()=>{
      unsubscribe();
   }
};

export default getLatestDate;



























/*
*
*  const result = await db.listDocuments(
        DbId,
        collectionId,
        [
            Query.orderDesc('$createdAt'),
            Query.limit(1)
               ]);




    return result.documents.length > 0 ? result.documents[0].date : [];
*
* */