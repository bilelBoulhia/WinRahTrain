import React, { useState } from "react";
import {SafeAreaView, StyleSheet, useColorScheme} from "react-native";
import {  Modal } from "react-native-magnus";
import {  Button } from "../Style/Theme";

import Colors from "../Constants/Colors";
import Form from "./Form";
import { Icon } from '@rneui/themed';



const Moudal = ({ style }) => {
    const [visible, setVisible] = useState(false);
    const colorScheme = useColorScheme();
    const modalBackgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;


    const handleClosing = () => {
        setVisible(false);
    };


    return (
        <SafeAreaView style={style}>
            <Button onPress={() => setVisible(true)}>
                Un train est à votre gare ? le signaler ici.
            </Button>
          <Modal isVisible={visible} bg={modalBackgroundColor}>

            <Icon name='close'  onPress={() => { setVisible(false); }} />
            <Form onResult={handleClosing} />

          </Modal>
        </SafeAreaView>
    );
}

export default Moudal;
