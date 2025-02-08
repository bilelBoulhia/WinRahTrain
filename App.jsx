import React, {useState, useEffect, useCallback} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {  View,Text } from './Style/Theme';
import 'react-native-url-polyfill/auto';

import Links from "./Components/Links";
import Qa from "./Components/Qa";
import Moudal from "./Components/Moudal";
import List from "./Components/List";

import Dropdown from "./Components/DropDown";

import signalRService from "./RequestHandlers/signalRService";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';
import Colors from "./Constants/Colors";



SplashScreen.preventAutoHideAsync().catch(() => {});
export default function SignalRClient() {


    const [routesData, setRoutesData] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appIsReady, setAppIsReady] = useState(false);


    useEffect(() => {
        let unsubscribe;
        async function prepare() {
            try {
                await Font.loadAsync({ 'Righteous': require('./assets/fonts/Righteous-Regular.ttf') });
            } catch (error) {
                alert(error);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
        return () => unsubscribe?.();
    }, []);

    useEffect(() => {

        const handleFetchingRoute = async () => {

            try {
                const res = await fetch('https://wrtserver-latest.onrender.com/api/Gares/getTrainRoutes');
                const jsonData = await res.json();
                setRoutesData(jsonData);
                setLoading(false);


            } catch (error) {
                alert(error);
            }



        };


        const setupConnection = async () => {
            try {
                await signalRService.startConnection();
                signalRService.connection.on("Error", (errorMessage) => {
                    alert(`Error: ${errorMessage}`);
                });

            } catch (error) {
                alert(error);
            }
        };

        handleFetchingRoute();

        setupConnection().catch(err=>console.log(err));
        return () => {
            if (signalRService.connection) {
                signalRService.connection.off("ReportsFetched");
            }
        };
        }, []);





    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>

            <Dropdown loading={loading} RoutesData={routesData} onselect={setSelectedValue} />
            <Qa />
            <List Ligne={selectedValue} />
            <Moudal trainRoute={selectedValue} routeSelected={selectedValue === null || selectedValue === 'Select a route'} style={styles.modalButton} />
            <Links />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalButton: {
        marginBottom: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    }
});
