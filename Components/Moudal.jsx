import React, {useEffect, useState} from "react";
import {SafeAreaView, useColorScheme} from "react-native";
import {  Modal } from "react-native-magnus";
import {  Button } from "../Style/Theme";
import showToast from "./Toast";
import Colors from "../Constants/Colors";
import Form from "./Form";
import { Icon } from '@rneui/themed';



const Moudal = ({ style ,routeSelected,trainRoute}) => {
    const [visible, setVisible] = useState(false);
    const colorScheme = useColorScheme();
    const modalBackgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        setIsSelected(routeSelected);
    }, [routeSelected]);
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
            <Button disabled={isSelected} onPress={() => setVisible(true)}>
                Un train est à votre gare ? le signaler ici.
            </Button>
            <Modal isVisible={visible} bg={modalBackgroundColor}>

                <Icon name='close'  onPress={() => { setVisible(false); }} />
                <Form trainRoute={trainRoute}  onResult={handleClosing} />

            </Modal>
        </SafeAreaView>
    );
}

export default Moudal;