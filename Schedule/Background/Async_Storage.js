import AsyncStorage from '@react-native-async-storage/async-storage';
import getLatest from '../../utils/newstItem';

async function saveTask() {
    getLatest('reports', async (lastitem) => {
        try {
            const timestamp = lastitem.date;
            const key = 'reports';
            await AsyncStorage.setItem('@task_data', JSON.stringify({ timestamp, key }));
            console.log('Task data saved');
        } catch (e) {
            console.error('Failed to save task data', e);
        }
    });
}
export default saveTask