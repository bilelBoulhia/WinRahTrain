import Delete from "../utils/delete";
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const BACKGROUND_TASK = 'six_hours_interval_delete';

const Task= (key) =>{

    TaskManager.defineTask(BACKGROUND_TASK,async () =>{

    Delete(key)

    return BackgroundFetch.BackgroundFetchResult.NewData;

    })


}

