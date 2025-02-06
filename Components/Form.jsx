import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { View, Button } from '../Style/Theme';
import Colors from '../Constants/Colors';
import SelectField from '../Components/selectField';

import Linges from '../Constants/Linges.json';
import signalRService from "../RequestHandlers/signalRService";

const Form = ({ onResult }) => {
    const [data, setData] = useState([]);
    const [currentGare, setDepartureStation] = useState(null);
    const [destinationtGare, setDestinationStation] = useState(null);
    const [trainRoute, setLigne] = useState("");
    const [loading, setLoading] = useState(false);
    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;

    useEffect(() => {
        // Reset stations when train route changes
        setDestinationStation(null);
        setDepartureStation(null);

        const handleFetchingGare = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://wrstserver-latest.onrender.com/api/Gares/getGares?TrainRoutes=${trainRoute}`);
                const jsonData = await res.json();
                console.log(trainRoute);
                console.log(jsonData);
                setData(jsonData);
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
        if (currentGare && destinationtGare) {
            const report = { trainRoute, currentGare, destinationtGare };
            await handleInsert(report);
            onResult(true);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Train Route Selection */}
            <SelectField
                fieldName="La linge"
                value={trainRoute}
                onSelect={setLigne}
                data={Linges.lignes.map(l => l.value)}
            />
            {/* Departure Station */}
            <SelectField
                fieldName="Departure Station"
                value={currentGare}
                isDisabled={!trainRoute}
                onSelect={setDepartureStation}
                data={data}
                loading={loading}
            />
            {/* Destination Station */}
            <SelectField
                fieldName="Destination Station"
                value={destinationtGare}
                isDisabled={!trainRoute}
                onSelect={setDestinationStation}
                data={data}
                loading={loading}
            />
            <View style={styles.button}>
                <Button
                    onPress={handleSubmit}
                    disabled={!currentGare || !destinationtGare || currentGare === destinationtGare}
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
