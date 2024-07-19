import {db,reference} from "../Config/DbProvider.js";
import { remove,ref  } from "firebase/database";
s


remove(ref(db,reference)).then(r=> console.log(r));

