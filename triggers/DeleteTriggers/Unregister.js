import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

export default async function unregisterBackgroundFetchAsync(BACKGROUND_TASK) {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK);
}
