import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/authContext";
import { Text } from "react-native";
import { Button } from 'react-native-elements';
import Lobby from "../../components/Lobby";
import { GameRouteNames, UserRouteNames } from "../../router/route-names";

const LobbyScreen = () => {

    const navigation = useNavigation<any>();

    const handleGoToProfile = () => {
        navigation.navigate('User', { screen: UserRouteNames.PROFILE });
    }
    
    const handleGoToGameFinder = () => {
        navigation.navigate('Game', { screen: GameRouteNames.GAME_FINDER });
    }

    const handleGoToShowGames = () => {
        navigation.navigate('Game', { screen: GameRouteNames.SHOW_GAMES });
    }

    return (
        <Lobby goToProfile={handleGoToProfile} goToGameFinder={handleGoToGameFinder} goToShowGames={handleGoToShowGames} />
    );
}

export default LobbyScreen;