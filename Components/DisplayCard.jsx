import {Text, HStack,} from '@gluestack-ui/themed';
import { View, Card } from '../Style/Theme';
import SvgIcon from '../assets/SvgIcon';
import {StyleSheet} from "react-native";

const DisplayCard = ({ station, destination, time }) => {
    return (

        <View>
            <Card

                variant="outline"
                width="80%"




            >
                <HStack justifyContent="space-between" alignItems="center">
                    <Text

                    >
                        {station}
                    </Text>

                    <SvgIcon width={24} height={24} />

                    <Text

                    >
                        {destination}
                    </Text>

                    <Text
                     sa
                    >
                        {time}
                    </Text>
                </HStack>
            </Card>
        </View>

    );
};



export default DisplayCard;