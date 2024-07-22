import React, { useRef, useState } from 'react';
import {
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    Animated,
    Modal,
    TouchableWithoutFeedback,
    useColorScheme,
} from 'react-native';
import { View, Text, Button, getResponsiveFontSize } from '../Style/Theme';
import Linges from '../Constants/Linges.json';
import Colors from "../Constants/Colors";
import { Icon } from '@rneui/themed';

const Dropdown = ({onselect}) => {
    const [selectedValue, setSelectedValue] = useState(Linges.lignes[0]);
    const [isOpen, setIsOpen] = useState(false);

    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const Textcolor = useColorScheme() === 'dark' ? Colors.dark.text : Colors.light.text;
    const CompColor = useColorScheme() === 'dark' ? Colors.dark.ComponentBackground : Colors.light.ComponentBackground;
    const BgColor = useColorScheme() === 'dark' ? Colors.dark.background : Colors.light.background;

    const toggleExpand = () => {
        setExpanded(!expanded);
        Animated.spring(animatedHeight, {
            toValue: expanded ? 0 : 1,
            useNativeDriver: false,
        }).start();
    };

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(!isOpen);
        onselect(value);
    };

    const handlePress = () => {
        toggleExpand();
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(!isOpen);
        setExpanded(false);
        Animated.spring(animatedHeight, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Button
                buttonStyle={{ width: 250, borderRadius: 10, backgroundColor: 'transparent' }}
                onPress={handlePress}
                titleStyle={{ color: Textcolor }}
            >
                {selectedValue}
                <Icon name="chevron-down-outline" size={18} type='ionicon' color={CompColor} style={styles.icon} />
            </Button>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="none"
                onRequestClose={closeDropdown}
            >
                <TouchableWithoutFeedback onPress={closeDropdown}>
                    <View style={styles.modalOverlay}>
                        <Animated.View style={[styles.dropdown, { opacity: animatedHeight, borderColor: CompColor, backgroundColor: BgColor }]}>
                            <FlatList
                                data={Linges.lignes}
                                keyExtractor={(item) => item}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text style={[styles.optionText, { color: Textcolor }]}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 15,
        left: 0,
        fontSize: 16,
        zIndex: 1,
    },
    buttonText: {
        fontSize: getResponsiveFontSize(16),
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 55,
        paddingLeft: 55,
    },
    icon: {
        marginLeft: 10,
    },
    dropdown: {
        maxHeight: 220,
        borderRadius: 5,
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 1,
    },
    option: {
        padding: 10,
    },
    optionText: {
        fontSize: getResponsiveFontSize(15),
        fontFamily: 'Righteous',
    },
    button: {
        backgroundColor: 'transparent',
    },
});

export default Dropdown;
