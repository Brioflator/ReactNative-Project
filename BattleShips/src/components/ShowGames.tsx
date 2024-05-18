import React, { useEffect, useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { Text } from "react-native-ui-lib";
import { getGames, getGameDetails } from "../api";
import { useAuth } from "../hooks/authContext";
import GameCard from "./GameCard";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { GameRouteNames } from "../router/route-names";
import { Button, SearchBar } from "react-native-elements";
import { Dimensions } from "react-native";
import { Image } from 'react-native';
import ThemeContext from "../../theme";

interface Game {
  id: string;
  player1: {
    id: string;
    email: string;
  };
  player1Id: string;
  player2: {
    id: string;
    email: string;
  };
  player2Id: string;
  playerToMoveId: string;
  status: string;
  details: GameDetails;
}

interface Games {
  total: number;
  games: Game[];
}

type GameDetails = {
  id: string;
  status: string;
  player1Id: string;
  player2Id: string;
  playerToMoveId: string;
  moves: any[];
  player1: {
    id: string;
    email: string;
  };
  player2: {
    id: string;
    email: string;
  };
};

const loadingTexts = [
  'Locating all the battleships...',
  'Preparing the cannons...',
  'Raising the anchors...',
  'Hoisting the sails... ',
  'Checking the compass...',
  'Scanning the horizon...',
  'Polishing the spyglass...'
];

const ShowGames: React.FC = () => {
  const [games, setGames] = useState<Games | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState('');
  const screenWidth = Dimensions.get("window").width;
  const auth = useAuth();

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate(GameRouteNames.LOBBY as never);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loadingTexts.length);
    setLoadingText(loadingTexts[randomIndex]);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames(auth.token);
        const gamesWithDetails = await Promise.all(
          data.games.map(async (game: { id: string }) => {
            const details = await getGameDetails(auth.token, game.id);
            return { ...game, details };
          })
        );
        setGames({ ...data, games: gamesWithDetails });
      } catch (error) {
        console.error(error);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games?.games.filter(
    (game) =>
      (!statusFilter || game.status === statusFilter) &&
      (game.player1?.email.includes(searchQuery) ||
        game.player2?.email.includes(searchQuery))
  );

  const { theme } = useContext(ThemeContext);

  return (
    <>
      {games ? (
        <>
          
          <ScrollView stickyHeaderIndices={[2]} showsVerticalScrollIndicator={false} style={{backgroundColor: "white"}} >
          <Button
            icon={{
              name: "arrow-left",
              size: 20,
              color: theme,
              type: "font-awesome",
            }}
            onPress={handleBackPress}
            buttonStyle={{
              backgroundColor: "transparent",
              borderRadius: 20,
              alignSelf: "flex-start",
            }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "800",
              color: theme,
              padding: 15,
            }}
          >
            Total: {games.total}
          </Text>
          <View style={{backgroundColor: "white"}}>
          <View
            style={{ flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between",marginTop:10}}
          >
            <SearchBar
              platform="default"
              placeholder="Search player..."
              onChangeText={setSearchQuery as any}
              value={searchQuery}
              showLoading={false}
              lightTheme={true}
              round={false}
              cancelButtonTitle={""}
              showCancel={false}
              loadingProps={{}} // provide an empty object as default value
              onClear={() => {}} // provide an empty function as default value
              onFocus={() => {}} // provide an empty function as default value
              onBlur={() => {}} // provide an empty function as default value
              onCancel={() => {}} // provide an empty function as default value
              cancelButtonProps={{}} // provide an empty object as default value
              searchIcon={{ name: "search", color: theme }} // change the color of the search icon here
              clearIcon={{ name: "clear", color: theme }}
              containerStyle={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: theme,
                borderRadius: 25,
                marginLeft: 10,
                width: screenWidth * 0.55,
              }}
              inputContainerStyle={{ backgroundColor: "white", height: 30 }}
              inputStyle={{ color: theme }}
              placeholderTextColor={theme}
            />
            <Picker
              selectedValue={statusFilter}
              onValueChange={(itemValue: string | null) =>
                setStatusFilter(itemValue)
              }
              style={{
                color: theme,
                fontSize: 18,
                width: screenWidth * 0.4,
              }}
            >
              <Picker.Item label="Status" value={null} />
              <Picker.Item label="Created" value="CREATED" />
              <Picker.Item label="Map Configuration" value="MAP_CONFIG" />
              <Picker.Item label="Ongoing" value="ACTIVE" />
              <Picker.Item label="Finished" value="FINISHED" />
            </Picker>
          </View>
          </View>
          
            {filteredGames?.map((game) => (
              <GameCard key={game.id} game={game.details} />
            ))}
          </ScrollView>
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: 200, height: 200, borderRadius: 100, overflow: 'hidden' }}>
          <Image
            source={require('../../assets/ship.gif')}
            style={{ width: 200, height: 200}}
          />
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "800",
              color: "black",
              padding: 30,
            }}
          >
            {loadingText}
          </Text>
        </View>
      )}
    </>
  );
};

export default ShowGames;
