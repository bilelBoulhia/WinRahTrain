import {db,reference} from "../Config/DbProvider.js";
import { remove,ref  } from "firebase/database";



remove(ref(db,reference)).then();

