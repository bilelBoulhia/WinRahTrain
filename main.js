import App from "./App";
import { RootSiblingParent } from 'react-native-root-siblings';
import { registerRootComponent } from 'expo';



function main() {

    return(

        <RootSiblingParent>
            <App />
        </RootSiblingParent>

    );

}
registerRootComponent(main);