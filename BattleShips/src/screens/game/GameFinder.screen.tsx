import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { Text } from "react-native";
import { Button } from 'react-native-elements';
import GameFinder from "../../components/GameFinder";

const GameFinderScreen = () => {

    return (
        <GameFinder />
    );
}

export default GameFinderScreen;