import {db, reference} from "../Config/DbProvider";
import {limitToLast, onValue, orderByChild, query, ref} from "firebase/database";


const getLatestDate = (callback) => {
   const latestItem = query(ref(db, reference), orderByChild('timestamp'), limitToLast(1));

   const unsubscribe= onValue(latestItem, (snapshot) => {


      console.log(Object.values(snapshot.val()))
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