

import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {Card, Text, View} from './Style/Theme';

import Links from "./Components/Links";
import Moudal from "./Components/Moudal";
import DisplayCard from "./Components/DisplayCard";






export default function App() {



    return (
        <View style={styles.container}>




            <DisplayCard  time='5:50' station='alger' destination='france' />


            <Moudal style={styles.modalButton}/>


                <Links/>




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