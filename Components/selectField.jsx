import React, { useRef } from 'react';
import {
    StyleSheet,
    useColorScheme,
    ActivityIndicator,
    View,
} from 'react-native';
import { Text, Button } from '../Style/Theme';
import { Select } from 'react-native-magnus';
import Colors from '../Constants/Colors';

const SelectField = ({ fieldName, value, onSelect, data, isDisabled, loading }) => {
    const selectRef = useRef();
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

    return (
        <View style={styles.container}>
            <Text style={styles.fieldName}>{fieldName}</Text>
            <View style={styles.buttonWrapper}>
                <Button  disabled={isDisabled || loading} onPress={() => selectRef.current?.open()}>

                    {loading ? (
                        <View style={styles.activityOverlay}>
                            <ActivityIndicator size="small"  color={Colors.light.primary} />
                        </View>
                    ) : (
                        value || `Select ${fieldName}`
                    )}

                </Button>

            </View>
            <Select
                onPress={() => isDisabled && selectRef.current?.close()}
                onSelect={onSelect}
                ref={selectRef}
                value={value}
                bg={backgroundColor}
                data={data}
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
        alignSelf: 'center',
    },
    fieldName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    buttonWrapper: {
        position: 'relative',

    },

    activityOverlay: {

        backgroundColor: 'rgba(255,255,255,0.5)',
    },
});

export default SelectField;
