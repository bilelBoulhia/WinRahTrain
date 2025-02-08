import React, { useEffect, useState } from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import { View, Button,Text } from '../Style/Theme';
import Colors from '../Constants/Colors';
import SelectField from '../Components/selectField';


import signalRService from "../RequestHandlers/signalRService";

const Form = ({ onResult ,trainRoute}) => {
    const [data, setData] = useState([]);
    const [currentGare, setDepartureStation] = useState(null);
    const [destinationGare, setDestinationStation] = useState(null);
    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

    useEffect(() => {

        setDestinationStation(null);
        setDepartureStation(null);

        const handleFetchingGare = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://wrtserver-latest.onrender.com/api/Gares/getGares?TrainRoute=${trainRoute}`);
                const jsonData = await res.json();
                setData(jsonData.map(g=>g.gare1));

            } catch (error) {
                alert(error);
            }
            setLoading(false);
        };

        if (trainRoute !== "") {
            handleFetchingGare().catch(error => console.log(error));
        }
    }, [trainRoute]);

    const handleInsert = async (report) => {
        try {
            await signalRService.startConnection();
            await signalRService.connection.invoke("SendReport", report);
            signalRService.connection.on("Error", (errorMessage) => {
                alert(`Error: ${errorMessage}`);
            });
        } catch (error) {
            alert(error);
        }
    };

    const handleSubmit = async () => {
        if (currentGare && destinationGare) {
            const report = { trainRoute, currentGare, destinationGare };
            await handleInsert(report);
            onResult(true);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>

            <Text style={styles.title}>
                {trainRoute}
            </Text>

            <SelectField
                fieldName="Departure Station"
                value={currentGare}
                isDisabled={!trainRoute}
                onSelect={setDepartureStation}
                data={data}
                loading={loading}
            />

            <SelectField
                fieldName="Destination Station"
                value={destinationGare}
                isDisabled={!trainRoute}
                onSelect={setDestinationStation}
                data={data}
                loading={loading}
            />
            <View style={styles.button}>
                <Button
                    onPress={handleSubmit}
                    disabled={!currentGare || !destinationGare || currentGare === destinationGare}
                >
                    report
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 150,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        marginTop: 50,
    },
});

export default Form;
