import { useFonts } from 'expo-font';
import {View, Text} from 'react-native';
import {Card} from '@rneui/themed';
import {getResponsiveWidth,getResponsiveFontSize} from '../Style/Theme'
import {useColorScheme} from "react-native";
import SvgIcon from '../assets/SvgIcon';
import { StyleSheet } from 'react-native';
import Colors from "../Constants/Colors";




const DisplayCard = ({ station, destination, time }) => {



    const ColorScheme = useColorScheme();
    const BackgroundColor = ColorScheme === 'dark' ? Colors.dark.ComponentBackground : Colors.light.ComponentBackground;
    const TextColor = ColorScheme === 'dark' ? Colors.dark.ComponentTextColor : Colors.light.ComponentTextColor;




    return (
        <View style={styles.container}>
            <Card  containerStyle={[styles.card,{backgroundColor:BackgroundColor}]} >
                <View style={styles.row}>
                    <Text style={[styles.text,{color: TextColor}]}>
                        {station}
                    </Text>
                    <SvgIcon width={30} height={30} />
                    <Text style={[styles.text,{color: TextColor}]}>
                        {destination}
                    </Text>
                    <Text style={[styles.text,{color: TextColor}]}>
                        {time}
                    </Text>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        width: getResponsiveWidth(380),


        alignSelf:'center'
    },
    card: {
        padding: 10,



        borderRadius:10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontFamily:'Righteous',
        color:'white',
        fontSize:getResponsiveFontSize(14),
    },

});

export default DisplayCard;
