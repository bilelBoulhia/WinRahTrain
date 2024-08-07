import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet} from 'react-native';
import { View } from './Style/Theme';
import 'react-native-url-polyfill/auto';
import * as SplashScreen from 'expo-splash-screen';
import Links from "./Components/Links";
import Qa from "./Components/Qa";
import Moudal from "./Components/Moudal";
import List from "./Components/List";
import get from "./functions/get";
import * as Font from 'expo-font';
import Dropdown from "./Components/DropDown";
import Linges from './Constants/Linges.json';





SplashScreen.preventAutoHideAsync().catch(()=>{});
function App() {

    const [selectedValue , setSelectedValue] = useState(Linges.lignes[0]);
    const [data, setData] = useState([]);
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        let unsubscribe;
        async function Prepare() {
            try {

                const [items] = await Promise.all([
                    new Promise((res)=>{
                        unsubscribe = get(selectedValue,(loadedItems) => {
                            res(loadedItems);
                            setData(loadedItems);

                        });
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

    }, [selectedValue]);

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


            <Dropdown  onselect={setSelectedValue}/>
            <Qa />
            <List list={data} Ligne={selectedValue} />
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

export default App;
