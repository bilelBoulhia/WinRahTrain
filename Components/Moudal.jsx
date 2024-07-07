import * as React from 'react';
import { Modal, Portal, Button, PaperProvider } from 'react-native-paper';
import {Text} from "../Style/Theme";

const Modal = () => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return (
        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Train à votre gare ? Veuillez le signaler ici</Text>
                </Modal>
            </Portal>
            <Button style={{marginTop: 30}} onPress={showModal}>
                <Text>Train à votre gare ? Veuillez le signaler ici</Text>
            </Button>
        </PaperProvider>
    );
};

export default Modal;