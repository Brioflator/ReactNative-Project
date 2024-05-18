import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LobbyScreen from "../screens/game/Lobby.screen";
import { GameRouteNames } from "./route-names";
import { Text } from "react-native";
import TableScreen from "../screens/game/Table.screen";
import GameFinder from "../screens/game/GameFinder.screen";
import ShowGames from "../screens/game/ShowGames.screen";
import PrepareFormation from "../screens/game/PrepareFormation.screen";

const GameStack = createNativeStackNavigator();

export default function GameRoutes() {
  return (
    <GameStack.Navigator
      initialRouteName="Lobby"
      screenOptions={{ headerShown: false }}
    >
      <GameStack.Screen
        name={GameRouteNames.LOBBY}
        component={LobbyScreen}
        options={{
          headerTitle: (props) => <Text {...props}>Lobby</Text>,
        }}
      />

      <GameStack.Screen
        name={GameRouteNames.TABLE}
        component={TableScreen}
        options={{
          headerTitle: (props) => <Text {...props}>Game</Text>,
        }}
      />

      <GameStack.Screen
        name={GameRouteNames.GAME_FINDER}
        component={GameFinder}
        options={{
          headerTitle: (props) => <Text {...props}>Game Finder</Text>,
        }}
      />

      <GameStack.Screen
        name={GameRouteNames.SHOW_GAMES}
        component={ShowGames}
        options={{
          headerTitle: (props) => <Text {...props}>Show Games</Text>,
        }}
      />

      <GameStack.Screen
        name={GameRouteNames.PREPARE_FORMATION}
        component={PrepareFormation}
        options={{
          headerTitle: (props) => <Text {...props}>Show Games</Text>,
        }}
      />
    </GameStack.Navigator>
  );
}
