import React, {useRef, useState, useCallback, forwardRef, useEffect} from 'react';
import {
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Animated,
    useColorScheme, Dimensions, ActivityIndicator,
} from 'react-native';
import {View, Text, Button, getResponsiveFontSize, getResponsiveWidth} from '../Style/Theme';

import Colors from "../Constants/Colors";
import { Icon } from '@rneui/themed';




const Dropdown = ({ onselect ,RoutesData,loading}) => {



    const [isOpen, setIsOpen] = useState(false);
    const [selectedName, setSelectedName] = useState('Select a route');


    const animatedHeight = useRef(new Animated.Value(0)).current;
    const Textcolor = useColorScheme() === 'dark' ? Colors.dark.ComponentTextColor : Colors.light.ComponentTextColor;
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

    const handleSelect = (name) => {
        setSelectedName(name);

        setIsOpen(false);
        Animated.spring(animatedHeight, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
        onselect(name);
    };

    return (
        <View style={[styles.container,{backgroundColor:CompColor}]}>
            <Button
                buttonStyle={{ width: 250, borderRadius: 10, backgroundColor: 'transparent' }}
                onPress={toggleDropdown}
                titleStyle={{ color: Textcolor }}
            >

                {loading ? 'Loading...' : selectedName}

                <Icon name="chevron-down-outline" size={18} type='ionicon' color={BgColor} style={styles.icon} />
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
                            borderColor: BgColor,
                            backgroundColor: CompColor
                        }]}>
                            <FlatList
                                data={RoutesData}
                                keyExtractor={(item) => item.trainRoute1}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => handleSelect(item.trainRoute1)}
                                    >
                                        <Text style={[styles.optionText, { color: Textcolor }]}>{item.trainRoute1}</Text>
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
    position:'relative',
    top:  (Dimensions.get('window').height - Dimensions.get('window').height) +5,
    left:10,

    width:getResponsiveWidth(180),
    borderRadius:15,
zIndex:99
    },
    icon: {
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 45,
        paddingLeft: 50,
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
