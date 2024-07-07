import React, { useRef, useState } from "react";
import { useColorScheme, View, StyleSheet } from "react-native";
import Colors from "../Constants/Colors";
import { Button, Text } from "../Style/Theme";
import { Select } from "react-native-magnus";
import gare from "../Constants/Gares.json";

const Selectfield = ({ fieldname }) => {
    const [selectValue, setSelectedValue] = useState(null);
    const selectRef = useRef();

    const colorScheme = useColorScheme();
    const selectBackgroundColor =
        colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

    const onSelectOption = (item) => {
        setSelectedValue(item);
    };

    return (
        <View style={styles.container}>
            <Text  style={styles.fieldName}>{fieldname}</Text>
            <View style={styles.buttonContainer}>
                <Button

                    style={styles.button}
                    w={200}
                    borderWidth={1}
                    onPress={() => {
                        if (selectRef.current) {
                            selectRef.current.open();
                        }
                    }}
                >
                    {selectValue ? selectValue.toString() : "Select"}
                </Button>
            </View>

            <Select
                onSelect={onSelectOption}
                ref={selectRef}
                value={selectValue}
                bg={selectBackgroundColor}
                data={gare.gares}
                renderItem={(item, index) => (
                    <Select.Option bg={selectBackgroundColor} value={item}>
                        <Text>{item}</Text>
                    </Select.Option>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        paddingRight: 20,
        marginTop:25
    },
    fieldName: {
        marginBottom: 20,
        textAlign: "left",
        fontSize: 15,
        
    },
    buttonContainer: {
        marginTop: 15,
    },
    button: {

    },
});

export default Selectfield;
