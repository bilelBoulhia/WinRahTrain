import * as BackgroundFetch from 'expo-background-fetch';



async function registerTask(BACKGROUND_TASK) {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
        minimumInterval: 6 * 60 * 60, // 6 hours in seconds
        stopOnTerminate: false,
        startOnBoot: true,
    });
}

export default registerTask();