import React, { useState, useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { GameRouteNames, UserRouteNames } from "../router/route-names";
import { TextInput } from "react-native";
import { Input, Button } from "react-native-elements";
import { Image } from 'react-native';
import { joinGame, createGame } from "../api";
import { useAuth } from "../hooks/authContext";
import * as Clipboard from "expo-clipboard";
import { Snackbar } from "react-native-paper";
import { StyleSheet, Text, View } from 'react-native';
import ThemeContext from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameFinder: React.FC = () => {
  const [gameCode, setGameCode] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<any>();
  const auth = useAuth();

  const onToggleSnackBar = () => setVisible(!visible);

  const handleGameCodeChange = (text: string) => {
    setGameCode(text);
  };

  const handleEnterGame = async () => {
    try {
      const game = await joinGame(auth.token, gameCode);
      console.log("Joined game:", game);
      if (game.code === 404) {
        setErrorMessage(game.message);
        setVisible(true);
      } else if (game.code === 401) {
        setErrorMessage(game.message);
        setVisible(true);
      } else {
        navigation.navigate(GameRouteNames.PREPARE_FORMATION as never, {
          game
        });
      }
    } catch (error) {
      console.error("Failed to join game:", error);
    }
  };

  const handleCreateGame = async () => {
    try {
      const game = await createGame(auth.token);
      console.log("Created game:", game);
      Clipboard.setString(game.id);
      await AsyncStorage.setItem('gameId', game.id);
      alert("Game code copied to clipboard");
      navigation.navigate(GameRouteNames.PREPARE_FORMATION as never, { game });
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate(GameRouteNames.LOBBY as never);
  };

  return (
    <View style={{ flex: 1 }}>
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

<View style={{ flex: 1, justifyContent: "center", padding: 50 }}>
  <View style={styles.card}>
      <Button
        title="Create Game"
        onPress={handleCreateGame}
        buttonStyle={{ backgroundColor: theme, borderRadius: 20 }}
      />
  </View>

  <View >
          <Image
            source={require('../../assets/pixel-cat.gif')}
          />
    </View>

  <View style={styles.card}>
      <Input
        placeholder="Game Code"
        leftIcon={{ type: "font-awesome", name: "gamepad", color: theme }}
        placeholderTextColor={theme} 
        onChangeText={handleGameCodeChange}
        value={gameCode}
      />
      <Button
        title="Join Game"
        onPress={handleEnterGame}
        buttonStyle={{ backgroundColor: theme, borderRadius: 20 }}
      />
    </View>

    

  <View
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      rippleColor={theme}
    >
      {errorMessage}
    </Snackbar>
  </View>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#000",
    padding: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 26 },
    shadowOpacity: 100,
    shadowRadius: 5,
    elevation: 15,
  },
});

export default GameFinder;
