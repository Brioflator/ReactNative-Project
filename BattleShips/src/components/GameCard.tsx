import React, {useContext} from "react";
import { View, StyleSheet, Clipboard } from "react-native";
import { Text } from "react-native-ui-lib";
import { getGameDetails } from "../api";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/authContext";
import { Button, Icon } from "react-native-elements";
import  ThemeContext from "../../theme";

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

interface GameCardProps {
  game: GameDetails;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null);
  const [copied, setCopied] = useState(false);
  const auth = useAuth();
  const { theme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    card: {
      backgroundColor: "white",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme,
      padding: 20,
      margin: 10,
      marginBottom: 20,
      shadowColor: "grey",
      shadowOffset: { width: 6, height: 70 },
      shadowOpacity: 100,
      shadowRadius: 5,
      elevation: 10,
    },
    labelText: {
      fontSize: 18,
      marginBottom: 5,
      fontWeight: "bold",
    },
    idText: {
      fontSize: 16,
      color: "grey",
    },
  });

  useEffect(() => {
    const fetchGameDetails = async () => {
      const token = auth.token;
      const details = await getGameDetails(token, game.id);
      setGameDetails(details);
    };

    fetchGameDetails();
  }, []);

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.labelText}>
          Game ID:{" "}
          <Text style={styles.idText} selectable>
            {game.id}
          </Text>
        </Text>
        <Button
          icon={{
            name: copied ? "check" : "content-copy",
            type: "material-community",
            color: theme,
            backgroundColor: "transparent",
          }}
          buttonStyle={{
            backgroundColor: "transparent",
            borderRadius: 30,
            height: 50,
            width: 50,
          }}
          title=""
          onPress={() => {
            Clipboard.setString(game.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
          }}
        />
      </View>
      <Text style={styles.labelText}>
        Status:{" "}
        <Text style={styles.idText} selectable>
          {game.status}
        </Text>
      </Text>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
          <Text style={styles.labelText} selectable>
            {gameDetails?.player1?.email || "No User Yet"}
          </Text>
        <Text style={styles.idText}>vs</Text>
          <Text style={styles.labelText} selectable>
            {gameDetails?.player2?.email || "No User Yet"}
          </Text>
      </View>

      <Text style={styles.labelText}>
        First to move:{" "}
        <Text style={styles.idText} selectable>
          {gameDetails?.player1?.email || "No User Yet"}
        </Text>
      </Text>
    </View>
  );
};



export default GameCard;
