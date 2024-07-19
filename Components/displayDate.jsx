import React, {useEffect, useState} from "react";
import getLatestDate from "../function/getLatestDate";
import { View} from '../Style/Theme';
import { Text} from 'react-native';
import {StyleSheet, useColorScheme} from "react-native";
import Colors from "../Constants/Colors";
import {DateDecConstructor} from "../function/Deconstructors";


const DisplayDate = () => {
    const [latestDate, setLatestDate] = useState(null);
    const TextColor = useColorScheme() === 'dark' ? Colors.dark.text : Colors.light.text;

    useEffect(() => {
        const unsubscribe = getLatestDate((date) => {
            setLatestDate(date);
        });

        return () => {

            unsubscribe();
        };
    }, []);



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
