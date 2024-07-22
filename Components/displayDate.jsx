import React, {useEffect, useState} from "react";
import getLatestDate from "../functions/getLatestDate";
import { View} from '../Style/Theme';
import { Text} from 'react-native';
import {StyleSheet, useColorScheme} from "react-native";
import Colors from "../Constants/Colors";
import {DateDecConstructor} from "../functions/Deconstructors";


const DisplayDate = ({Ligne}) => {
    const [latestDate, setLatestDate] = useState(null);
    const TextColor = useColorScheme() === 'dark' ? Colors.dark.text : Colors.light.text;
    let Deps = Ligne;
    useEffect(() => {
        const unsubscribe = getLatestDate(Ligne,(date) => {
            setLatestDate(date);

        });

        return () => {

            unsubscribe();
        };
    }, [Deps]);



    return (
        <View style={styles.emptyContainer}>
            <Text style={[{ color: TextColor }, styles.textContainer]}>
            le dernier Raport est on : {DateDecConstructor(latestDate)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    emptyContainer: {

    },
    textContainer: {
        fontFamily: 'Righteous',
    },



});

export default DisplayDate;
