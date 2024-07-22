import React, { useRef, useState, useCallback } from 'react';
import {
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Animated,
    useColorScheme,
} from 'react-native';
import { View, Text, Button, getResponsiveFontSize } from '../Style/Theme';
import Linges from '../Constants/Linges.json';
import Colors from "../Constants/Colors";
import { Icon } from '@rneui/themed';

const Dropdown = ({ onselect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(Linges.lignes[0]);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const Textcolor = useColorScheme() === 'dark' ? Colors.dark.text : Colors.light.text;
    const CompColor = useColorScheme() === 'dark' ? Colors.dark.ComponentBackground : Colors.light.ComponentBackground;
    const BgColor = useColorScheme() === 'dark' ? Colors.dark.background : Colors.light.background;

    const toggleDropdown = useCallback(() => {
        if (isOpen) {
            Animated.spring(animatedHeight, {
                toValue: 0,
                useNativeDriver: false,
            }).start(() => setIsOpen(false));
        } else {
            setIsOpen(true);
            Animated.spring(animatedHeight, {
                toValue: 1,
                useNativeDriver: false,
            }).start();
        }
    }, [isOpen, animatedHeight]);

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
        Animated.spring(animatedHeight, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
        onselect(value);
    };

    return (
        <View style={styles.container}>
            <Button
                buttonStyle={{ width: 250, borderRadius: 10, backgroundColor: 'transparent' }}
                onPress={toggleDropdown}
                titleStyle={{ color: Textcolor }}
            >
                {selectedValue}
                <Icon name="chevron-down-outline" size={18} type='ionicon' color={CompColor} style={styles.icon} />
            </Button>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="none"
                onRequestClose={() => {
                    setIsOpen(false);
                    Animated.spring(animatedHeight, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }}
            >
                <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                    <View style={styles.modalOverlay}>
                        <Animated.View style={[styles.dropdown, {
                            opacity: animatedHeight,
                            height: animatedHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 220],
                            }),
                            borderColor: CompColor,
                            backgroundColor: BgColor
                        }]}>
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
    icon: {
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 55,
        paddingLeft: 55,
    },
    dropdown: {
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
});

export default Dropdown;
