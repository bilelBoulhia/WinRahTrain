import React from 'react';
import {  View as DefaultView, Dimensions ,Text as DefaultText} from 'react-native';

import { Button as DefaultButton } from "@rneui/themed";
import Colors from "../Constants/Colors";
import { useColorScheme } from "react-native";






const useThemeColor = (props, colorName) => {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];
    return colorFromProps || Colors[theme][colorName];
};

const getResponsiveFontSize = (baseSize) => {
    const windowWidth = Dimensions.get('window').width;
    if (windowWidth <= 320) {
        return baseSize * 0.8;
    }
    return baseSize;
};

const getResponsiveWidth = (baseWidth) => {
    const windowWidth = Dimensions.get('window').width;
    if (windowWidth >= 320 && windowWidth <= 390) {
        return baseWidth * 0.8;
    }
    return baseWidth;
};

const Text = (props) => {

    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const fontWeight = Colors[useColorScheme() ?? 'light'].fontWeight;
    const fontSize = getResponsiveFontSize(style?.fontSize || 14);


    const fontFamily=Colors.light.fontFamily

    return <DefaultText style={[{fontFamily,color, fontWeight, fontSize, }, style]} {...otherProps} />;
};

const Button = (props) => {
    const { style, lightColor, darkColor, buttonStyle, titleStyle, ...otherProps } = props;
    const bg = useThemeColor({ light: lightColor, dark: darkColor }, 'ComponentBackground');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'ComponentTextColor');
    const radius = 4;

    const baseWidth = 360;
    const width = getResponsiveWidth(baseWidth);
    const fontSize = getResponsiveFontSize(14);
    const fontFamily = Colors.light.fontFamily;

    return <DefaultButton
        buttonStyle={[{ backgroundColor: bg, borderRadius: radius, width: width, alignSelf: 'center' }, buttonStyle]}
        titleStyle={[{ color: color, fontSize: fontSize, fontFamily: fontFamily }, titleStyle]}
        {...otherProps}
    />;
};

const View = (props) => {
    const { style,onLayoutprop ,lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');




    return <DefaultView   style={[{ backgroundColor }, style]} {...otherProps} />;
};


export { Text, View, Button, getResponsiveWidth,getResponsiveFontSize };