import React, { useState } from "react";
import {SafeAreaView, useColorScheme} from "react-native";
import {  Modal } from "react-native-magnus";
import {  Button } from "../Style/Theme";
import showToast from "./Toast";
import Colors from "../Constants/Colors";
import Form from "./Form";
import { Icon } from '@rneui/themed';



const Moudal = ({ style }) => {
    const [visible, setVisible] = useState(false);
    const colorScheme = useColorScheme();
    const modalBackgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;


    const handleClosing = (isSuccess) => {
        setVisible(false);
        if (isSuccess) {
            showToast('merci pour votre rapport :)');
        } else {
            showToast('error');
        }
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