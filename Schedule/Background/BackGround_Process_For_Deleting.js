import * as TaskManager from 'expo-task-manager';
import Delete from "../../utils/delete";
import scheduleDelete from "../ScheduleDelete";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_TASK = 'background-delete-task';



TaskManager.defineTask(BACKGROUND_TASK,async ({error})=>{

    if(error){
        console.error(error);
        return;
    }
    try {

        const data = await AsyncStorage.getItem('@task_data');
        if (data !== null) {
            const { timestamp, key } = JSON.parse(data);
            scheduleDelete(timestamp, key);
        }
    }catch(e){
        console.error(e);
    }

});