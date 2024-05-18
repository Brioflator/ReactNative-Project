import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { Text } from "react-native";
import { Button } from 'react-native-elements';
import ShowGames from "../../components/ShowGames";

const GameFinderScreen = () => {
    const { signOut } = useAuth();

    return (
        <ShowGames />
    );
}

export default GameFinderScreen;