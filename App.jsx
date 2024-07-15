import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Style/Theme';
import Links from "./Components/Links";
import Moudal from "./Components/Moudal";
import List from "./Components/List";
import Qa from "./Components/Qa";
import get from "./utils/get";
import registerTask from "./Schedule/Background/Register_Procces";
import saveTask from "./Schedule/Background/Async_Storage";
import CheckTime from "./Schedule/Foreground/CheckTime";
import Delete from "./utils/delete";

async function scheduleDeletion() {
    await saveTask();
    await registerTask();
    await CheckTime();
}
function App() {
    const [data, setData] = useState([]);

    useEffect(() => {

        get('reports',setData)
        scheduleDeletion()

    }, []);

    console.table('d',data)
    return (
        <View style={styles.container}>
            <Qa/>
            <List list={data} />
            <Moudal style={styles.modalButton} />
            <Links/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    qaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    qaIcon: {
        marginRight: 10,
    },
    modalButton: {
        marginBottom: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
});
export default App;