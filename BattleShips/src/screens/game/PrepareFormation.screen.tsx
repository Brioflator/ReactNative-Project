import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { Text } from "react-native";
import { Button } from 'react-native-elements';
import PrepareFormation from "../../components/PrepareFormation";

const GameFinderScreen = () => {

    return (
        <PrepareFormation />
    );
}

export default GameFinderScreen;