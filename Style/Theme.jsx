import React from 'react';
import {Text as DefaultText, View as DefaultView  } from 'react-native';
import {Button as DefaultButton,Card as DefaultCard} from "@rneui/themed";
import Colors from "../Constants/Colors";

import { useColorScheme } from "react-native";


const useThemeColor = (props, colorName) => {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];
    return colorFromProps || Colors[theme][colorName];
};

const Text = (props) => {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const fontWeight = Colors[useColorScheme() ?? 'light'].fontWeight;

    return <DefaultText style={[{ color, fontWeight }, style]} {...otherProps} />;
};

const Button = (props) => {

    const { style, lightColor, darkColor, ...otherProps } = props;

    const bg = useThemeColor({ light: lightColor, dark: darkColor }, 'ComponentBackground');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'ComponentTextColor');

    const radius = 4;

    const width = 350;



    return <DefaultButton  buttonStyle={{backgroundColor:bg,borderRadius:radius,width:width ,alignSelf:'center'}} titleStyle={{color:color}} {...otherProps}  />;
}



const View = (props) => {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');



    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

const Card = (props) =>{

    const { style, lightColor, darkColor, ...otherProps } = props;

    const backgroundColor = useThemeColor({light: lightColor, dark: darkColor }, 'ComponentBackground');

    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'ComponentTextColor');
    const width = '80%';

    return <DefaultCard containerStyle={{borderRadius:20,height:50, backgroundColor:backgroundColor,width:width ,alignSelf:'center'}} textStyle={{color:color}} {...otherProps} />

}


export { Text, View,Button,Card };
