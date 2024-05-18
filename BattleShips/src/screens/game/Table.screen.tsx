import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { Text } from "react-native";
import { Button } from 'react-native-elements';

const TableScreen = () => {
    const { signOut } = useAuth();

    return (
        <>
            <Text>Game</Text>
            <Button title="Sign Out" onPress={signOut} />
        </>
    );
}

export default TableScreen;