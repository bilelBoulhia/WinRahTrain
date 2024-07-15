import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
const BACKGROUND_TASK = 'background-delete-task';


async function registerTask() {
    const status = await BackgroundFetch.getStatusAsync();
    if(status !== BackgroundFetch.BackgroundFetchStatus.Available) {
        console.log('not available');
        return;
    }
    try {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
            minimumInterval: 15 * 60, // 15 minutes
            stopOnTerminate: false,
            startOnBoot: true,
        });
        console.log('Background fetch registered successfully');
    } catch (err) {
        console.log('Error registering background fetch', err);
    }
}
export default registerTask