import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Style/Theme';
import Links from "./Components/Links";
import gun from "./Config/DbProvider";
import Moudal from "./Components/Moudal";
import List from "./Components/List";
import Qa from "./Components/Qa";
import get from "./utils/get";


function App() {
    const [data, setData] = useState([]);

    useEffect(() => {

       get('reports',setData)


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