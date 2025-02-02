import React, {useRef, useEffect, useState} from 'react';
import {FlatList, StyleSheet, useColorScheme} from 'react-native';
import DisplayCard from './DisplayCard';

import {getResponsiveFontSize, getResponsiveWidth, View} from '../Style/Theme';

import { Text} from 'react-native';

import Colors from "../Constants/Colors";
import {MotiView} from "moti";
import signalRService from "../RequestHandlers/signalRService";






const List = (Ligne) => {
    const flatListRef = useRef(null);
    const [reports,setReports] = useState([]);
    const TextColor = useColorScheme() ==='dark' ? Colors.dark.text : Colors.light.text;


    useEffect(() => {

        if (flatListRef.current  > 0) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
        const ListenToUpdates=()=>{
            try{
                console.log(Ligne)
                signalRService.connection.invoke("GetReports", Ligne.Ligne).catch(console.error);
                signalRService.connection.on("ReportsFetched", (reports) => {
                    setReports(reports);
                    console.log(reports);
                });
                signalRService.connection.on("ReportReceived",(newReprt)=>{
                    setReports(prev=>[newReprt,...prev]);
                })

            }catch(e){
                console.log(e);
            }
        }
        ListenToUpdates();

        return () => {
            if (signalRService.connection) {
                signalRService.connection.off("ReportsFetched");
                signalRService.connection.off("ReportReceived");
            }
        };

    }, [Ligne]);

    if ( reports.length <= 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={[{ color: TextColor }, styles.textContainer]}>aucun train a ete raporter</Text>
            </View>
        );
    } else {

        return (
            <View style={styles.containerWrapper}>

                <View style={styles.headers}>

                    <View style={styles.row}>
                        <Text style={[styles.text,{color: TextColor}]}>
                            station actuelle
                        </Text>

                        <Text style={[styles.text,{color: TextColor}]}>
                            destination
                        </Text>
                        <Text style={[styles.text,{color: TextColor}]}>
                            Heure
                        </Text>
                    </View>
                    <FlatList


                        ref={flatListRef}
                        data={(reports).reverse()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (

                            <MotiView
                                key={index.toString()}
                                from={{
                                    translateY: 100,
                                    opacity: 0,
                                }}
                                animate={{
                                    translateY: 0,
                                    opacity: 1,
                                }}
                                transition={{
                                    type: 'timing',
                                    duration: 300,
                                    delay: index * 50,
                                }}
                            >

                                <DisplayCard
                                    time={item.arrivalHour}
                                    destination={item.destinationtGare}
                                    station={item.currentGare}
                                />
                            </MotiView>
                        )}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                        contentContainerStyle={styles.contentContainer}
                        inverted
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}

                    />
                </View>
            </View>

        );
    }
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        fontFamily: 'Righteous',
        width:200,

        textAlign:'center',
    },
    containerWrapper: {
        flex: 1,
        marginVertical: 100,
        alignSelf: 'center',
        overflow: 'hidden',

    },
    container: {
        flex: 1,
        padding: 5,

    },

    headers:{

        width: getResponsiveWidth(380),
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },

   row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },

    text: {
        flex: 1,
        textAlign: 'center',
        fontFamily:'Righteous',
        color:'white',
        fontSize:getResponsiveFontSize(14),
    },
});

export default List;