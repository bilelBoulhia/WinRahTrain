import React, { useRef } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { View, Text, Button } from '../Style/Theme';
import { Select } from 'react-native-magnus';
import Colors from '../Constants/Colors';
import gare from '../Constants/Gares.json';

const SelectField = ({ fieldName, value, onSelect }) => {
    const selectRef = useRef();
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;


    return (
        <View style={styles.container}>
            <Text style={[styles.fieldName]}>{fieldName}</Text>
            <Button onPress={() => selectRef.current?.open()}>

            {value || `Select ${fieldName}`}

            </Button>
            <Select
                onSelect={onSelect}
                ref={selectRef}
                value={value}
                bg={backgroundColor}
                data={gare.gares}
                renderItem={(item) => (
                    <Select.Option bg={backgroundColor} value={item}>
                        <Text>{item}</Text>
                    </Select.Option>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignSelf:"center"
    },
    fieldName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },


});

export default SelectField;