import React, {useRef, useEffect, useState} from 'react';
import {FlatList, StyleSheet, useColorScheme} from 'react-native';
import DisplayCard from './DisplayCard';

import { View } from '../Style/Theme';

import { Text} from 'react-native';

import Colors from "../Constants/Colors";
import DisplayDate from "./displayDate";
import {MotiView} from "moti";







const List = ({ list  }) => {
    const flatListRef = useRef(null);
    const TextColor = useColorScheme() ==='dark' ? Colors.dark.text : Colors.light.text;
    useEffect(() => {
        if (flatListRef.current && list.length > 0) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }

    }, [list]);

    if ( list <= 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={[{ color: TextColor }, styles.textContainer]}>aucun train a ete raporter</Text>
            </View>
        );
    } else {

        return (
            <View style={styles.containerWrapper}>
                <View style={styles.datecontainer}>

                    <DisplayDate/>

                </View>
                <View style={styles.container}>
                    <FlatList

                        ref={flatListRef}
                        data={[...list].reverse()}
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

                                    time={item.time}
                                    destination={item.destination}
                                    station={item.station}
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

    contentContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    datecontainer:{
        marginLeft:30
    }
});

export default List;