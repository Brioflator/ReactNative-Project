import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { Text } from "react-native";
import { Button } from 'react-native-elements';
import Lobby from "../../components/Lobby";
import UserInfo from "../../components/UserInfo";

const ProfileScreen = () => {

    return (
        <UserInfo />
    );
}

export default ProfileScreen;