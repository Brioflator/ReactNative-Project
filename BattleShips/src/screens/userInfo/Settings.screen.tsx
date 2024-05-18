import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { Text } from "react-native";
import { Button } from 'react-native-elements';
import Lobby from "../../components/Lobby";

const SettingsScreen = () => {

    return (
        <Text>{'Settings'}</Text>
    );
}

export default SettingsScreen;