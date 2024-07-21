import React, {useEffect, useState} from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { View, Button } from '../Style/Theme';
import Colors from '../Constants/Colors';
import SelectField from '../Components/selectField';
import insert from "../function/insert";
import Report from "../Models/Raport";


import Linges from '../Constants/Linges.json';
import dic from '../Constants/gare-dic'



const Form = ({onResult}) => {

    const [data,setdata] = useState([]);
    const [departureStation, setDepartureStation] = useState(null);
    const [destinationStation, setDestinationStation] = useState(null);
    const [ligne, setLigne] = useState("");



    const colorScheme = useColorScheme();
    const backgroundColor = colorScheme === 'dark' ? Colors.dark.background : Colors.light.background;


    const handleGare = (ligne) => dic.has(ligne) ? setdata(dic.get(ligne)) : setdata(["error"]);
    useEffect(() => {
        handleGare(ligne)

    }, [ligne]);



    const handleSubmit =  () => {
        if (departureStation && destinationStation) {
            const Rep = new Report(departureStation, destinationStation);
            const onSubmit =  insert(Rep) ;
            onResult(onSubmit);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor }]}>

            <SelectField
                fieldName="La linge"
                value={ligne}
                onSelect={setLigne}
                data={Linges.lignes}
            />
            <SelectField
                fieldName="Departure Station"
                value={departureStation}
                isDisabled={!ligne}
                onSelect={setDepartureStation}
                data={data}
            />
            <SelectField
                fieldName="Destination Station"
                value={destinationStation}

                isDisabled={!ligne}

                onSelect={setDestinationStation}
                data={data}
            />
            <View style={styles.button}>
                <Button

                    onPress={handleSubmit}
                    disabled={ !departureStation || !destinationStation || (destinationStation === departureStation)}>
                    report
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



        marginBottom: 30,

        textAlign: 'center',
    },
    button:{
        marginTop:50
    }

});

export default Form;