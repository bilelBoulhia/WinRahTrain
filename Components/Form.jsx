import React, { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { View, Text, Button } from '../Style/Theme';
import Colors from '../Constants/Colors';
import SelectField from '../Components/selectField';

const Form = ({ onSubmit }) => {
    const [departureStation, setDepartureStation] = useState(null);
    const [destinationStation, setDestinationStation] = useState(null);
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;
    const textColor = colorScheme === 'dark' ? Colors.dark.text : Colors.light.text;

    const handleSubmit = () => {
        if (departureStation && destinationStation) {
            onSubmit({ departureStation, destinationStation });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={[styles.title, { color: textColor }]}>Rapporter la location de train</Text>
            <SelectField
                fieldName="Departure Station"
                value={departureStation}
                onSelect={setDepartureStation}
            />
            <SelectField
                fieldName="Destination Station"
                value={destinationStation}
                onSelect={setDestinationStation}
            />
            <View style={styles.button}>
                <Button

                    onPress={handleSubmit}
                    disabled={!departureStation || !destinationStation}
                >
                    Raporteer
                </Button>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom:150,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,

        textAlign: 'center',
    },
    button:{
        marginTop:50
    }

});

export default Form;