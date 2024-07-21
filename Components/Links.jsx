import React from 'react';
import { StyleSheet,Linking } from 'react-native';
import { View } from '../Style/Theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors'

import { useColorScheme } from 'react-native';
const Links = () => {
    const openURL = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    };
    const theme = useColorScheme();
    const iconColor = theme === 'dark' ? Colors.dark.text : Colors.light.text;

    return (
        <View style={styles.footer}>
            <Icon
                name="github"
                size={20}
                color={iconColor}
                style={styles.icon}
                onPress={() => openURL('https://github.com/bilelBoulhia')}
            />
            <Icon
                name="instagram"
                size={20}
                color={iconColor}
                style={styles.icon}
                onPress={() => openURL('https://www.instagram.com/bilel_lll_')}
            />



        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,

    },
    icon: {
        marginHorizontal: 10,
    },
});

export default Links;
