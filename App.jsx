import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet} from 'react-native';
import {  View } from './Style/Theme';
import 'react-native-url-polyfill/auto';
import Linges from './Constants/Linges.json';
import Links from "./Components/Links";
import Qa from "./Components/Qa";
import Moudal from "./Components/Moudal";
import List from "./Components/List";

import Dropdown from "./Components/DropDown";

import signalRService from "./RequestHandlers/signalRService";
import * as SplashScreen from "expo-splash-screen";
import * as Font from 'expo-font';



SplashScreen.preventAutoHideAsync().catch(() => {});
export default function SignalRClient() {


    const [selectedValue, setSelectedValue] = useState(Linges.lignes[0].value);


    const [appIsReady, setAppIsReady] = useState(false);


    useEffect(() => {
        let unsubscribe;
        async function prepare() {
            try {
                await Font.loadAsync({ 'Righteous': require('./assets/fonts/Righteous-Regular.ttf') });
            } catch (error) {
                console.error(error);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare().catch(console.error);
        return () => unsubscribe?.();
    }, []);

    useEffect(() => {
        const setupConnection = async () => {
            try {
                await signalRService.startConnection();
                signalRService.connection.on("Error", (errorMessage) => {
                    alert(`Error: ${errorMessage}`);
                });

            } catch (error) {
                console.error("Connection error:", error);
            }
        };

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
            <Dropdown onselect={setSelectedValue} />
            <Qa />
            <List Ligne={selectedValue} />
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
    modalButton: {
        marginBottom: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
});
