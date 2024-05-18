import React, { useEffect, useState, useContext } from "react";
import { getUser, login } from "../api";
import { useAuth } from "../hooks/authContext";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";
import UserIcon from "./UserIcon";
import { Button } from "react-native-elements";
import PieChart from "react-native-pie-chart";
import ColorButton from './ThemeButton';
import ThemeContext, { themes } from '../../theme';
import { ScrollView } from 'react-native';

interface User {
  id: string;
  email: string;
  currentlyGamesPlaying: number;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
}

const UserInfo: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = useAuth();
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    card: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
      borderColor: "#000",
      padding: 30,
      marginBottom: 20,
    },
    chartContainer: {
      position: "relative",
      width: 70,
      height: 70,
      justifyContent: "center",
      alignItems: "center",
    },
    percentageText: {
      position: "absolute",
      fontSize: 20,
      fontWeight: "bold",
      color: theme,
    },
    banner: {
      position: "absolute",
      top: 0,
      width: Dimensions.get("window").width,
      height: 200,
      backgroundColor: theme,
    },
    bento: {
      margin: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    descriptionText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme,
      textAlign: "center",
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
    const fetchUser = async () => {
      try {
        const data = await getUser(auth.token);
        console.log(data);
        setUser({
          id: data.user.id,
          email: data.user.email,
          currentlyGamesPlaying: data.currentlyGamesPlaying,
          gamesLost: data.gamesLost,
          gamesPlayed: data.gamesPlayed,
          gamesWon: data.gamesWon,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <>
          <View style={[styles.banner, { backgroundColor: theme }]}></View>
          <ScrollView horizontal>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              {Object.values(themes).map((color, index) => (
                <ColorButton key={index} color={color} onPress={() => setTheme(color)} />
              ))}
            </View>
          </ScrollView>
          <View style={styles.card}>
          
            <UserIcon color={theme} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.descriptionText} selectable>
                {user.email}
              </Text>
            </View>
            <Text style={styles.labelText}>
              ID:{" "}
              <Text style={styles.idText} selectable>
                {user.id}
              </Text>
            </Text>
          </View>
          
          <View style={styles.bento}>
            <View style={styles.card}>
              <Text style={styles.labelText}>All Played: </Text>
              <Text
                style={{ fontSize: 40, fontWeight: "bold", color: theme }}
                selectable
              >
                {user.gamesPlayed}
              </Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.labelText}>Lost: </Text>
              <View style={styles.chartContainer}>
                <PieChart
                  widthAndHeight={70}
                  series={[((user.gamesLost / user.gamesPlayed) * 100), 100-((user.gamesLost / user.gamesPlayed) * 100)]}
                  sliceColor={[theme, "white"]}
                  coverRadius={0.75}
                />
                <Text style={styles.percentageText}>
                  {((user.gamesLost / user.gamesPlayed) * 100)}
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.labelText}>Won: </Text>
              <View style={styles.chartContainer}>
                <PieChart
                  widthAndHeight={70}
                  series={[((user.gamesWon / user.gamesPlayed) * 100), 100-((user.gamesWon / user.gamesPlayed) * 100)]}
                  sliceColor={[theme, "white"]}
                  coverRadius={0.75}
                />
                <Text style={styles.percentageText}>
                  {((user.gamesWon / user.gamesPlayed) * 100)}
                </Text>
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.labelText}>Ongoing: </Text>
              <View style={styles.chartContainer}>
                <PieChart
                  widthAndHeight={70}
                  series={[((user.currentlyGamesPlaying / user.gamesPlayed) * 100), 100-((user.currentlyGamesPlaying / user.gamesPlayed) * 100)]}
                  sliceColor={[theme, "white"]}
                  coverRadius={0.75}
                />
                <Text style={styles.percentageText}>
                  {((user.currentlyGamesPlaying / user.gamesPlayed) * 100)}
                </Text>
              </View>
            </View>
          </View>
          
        </>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "800",
              color: theme,
              padding: 30,
            }}
          >
            Loading...
          </Text>
        </View>
      )}
    </View>
  );

};



export default UserInfo;
