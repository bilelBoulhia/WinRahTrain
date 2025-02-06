import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import { View} from '../Style/Theme';
import { Icon } from '@rneui/themed';





const Qa = () => {
    const [expanded, setExpanded] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;






    const toggleExpand = () => {
        setExpanded(!expanded);

        Animated.spring(animatedHeight, {
            toValue: expanded ? 0 : 1,
            useNativeDriver: false,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.iconContainer}
                onPress={()=>toggleExpand()}
            >
                <Icon
                        color="white"
                        name="question-circle"
                        type="font-awesome"
                        size={24}
                   />

            </TouchableOpacity>

            <Modal
                visible={expanded}
                transparent={true}
                animationType="none"
                onRequestClose={() => {
                    setExpanded(true);
                    Animated.spring(animatedHeight, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }}
            >
            <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                <View style={styles.modalOverlay}>
            <Animated.View style={[
                styles.content,
                {
                    maxHeight: animatedHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 300]
                    }),
                    opacity: animatedHeight
                }
            ]}>

                <Text style={styles.title}>Informations sur l'app</Text>
                <Text style={styles.description}>
                    Ce panneau d'affichage explique les informations montrées sur l'écran responsable d'indiquer la position du train.
                </Text>
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Format d'affichage:</Text>
                    <Text style={styles.chart}>
                        destination actuelle ⇒ destination finale ⇒ heure
                    </Text>
                </View>
                <Text style={styles.example}>Par exemple:</Text>
                <Text style={styles.chartExample}>
                    Alger ⇒ Reghaia ⇒ 14:35
                </Text>
            </Animated.View>
                </View>
                    </TouchableWithoutFeedback>
                </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:  (Dimensions.get('window').height - Dimensions.get('window').height) +5 ,
        right: 10,
        zIndex: 1,


    },
    iconContainer: {
        alignSelf: 'flex-end',

    },

    modalOverlay: {

        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 25,
        paddingLeft: 25,
    },

    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        maxWidth: 250,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,

        fontFamily:'Righteous',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
        fontFamily:'Righteous',
    },
    chartContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,

        marginBottom: 10,
    },
    chartTitle: {
        fontSize: 14,
        fontFamily:'Righteous',
        color: '#444',
        marginBottom: 5,
    },
    chart: {
        fontSize: 13,
        color: '#666',
        fontFamily:'Righteous',
    },
    example: {
        fontSize: 14,
        fontFamily:'Righteous',
        color: '#444',
        marginBottom: 5,
    },
    chartExample: {
        fontSize: 13,
        fontFamily:'Righteous',
        color: '#4c669f',

    }
});

export default Qa;