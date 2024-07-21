import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet } from 'react-native';
import { View } from './Style/Theme';
import 'react-native-url-polyfill/auto';
import * as SplashScreen from 'expo-splash-screen';
import Links from "./Components/Links";
import Qa from "./Components/Qa";
import Moudal from "./Components/Moudal";
import List from "./Components/List";
import get from "./function/get";
import * as Font from 'expo-font';
import gare from "./Constants/Gare.json";


SplashScreen.preventAutoHideAsync().catch(()=>{});
function App() {
    const [data, setData] = useState([]);
    const [appIsReady, setAppIsReady] = useState(false);










    useEffect(() => {
        let unsubscribe;
        async function Prepare() {
            try {

                const [items] = await Promise.all([
                    new Promise((res)=>{
                        unsubscribe = get((loadedItems)=> res(loadedItems));
                    }),
                    Font.loadAsync({ 'Righteous': require('./assets/fonts/Righteous-Regular.ttf') })
                ])

                setData(items);
            } catch (error) {
                console.error(error);
            } finally {
                setAppIsReady(true);
            }
        }

        Prepare().catch(()=>{});

        return () => {
            if (unsubscribe) {
                unsubscribe();
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
        <View style={styles.container} onLayout={onLayoutRootView} >
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
