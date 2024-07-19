import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Style/Theme';
import 'react-native-url-polyfill/auto';

import Links from "./Components/Links";
import Qa from "./Components/Qa";
import Moudal from "./Components/Moudal";
import List from "./Components/List";
import get from "./function/get";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = get((items) => {
            setData(items);
        });



        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Qa />
            <List list={data} />
            <Moudal style={styles.modalButton} />
            <Links />
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
//appwrite
{/*
  const handleResponse = async (response) => {
        const eventData = response.payload;
        setData(prevData => {
            const updatedData = [...prevData];
            const index = updatedData.findIndex(item => item.$id === eventData.$id);
            if (index !== -1) {
                updatedData[index] = eventData;
            } else {
                updatedData.push(eventData);
            }

            return updatedData;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await get(IDs.DatabaseId, IDs.collectionId);
            setData(result);
        };
        fetchData();

        const unsubscribe = subscribe(IDs.DatabaseId, IDs.collectionId, handleResponse);

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, []);*/}