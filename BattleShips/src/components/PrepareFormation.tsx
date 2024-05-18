import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import { Card } from "react-native-paper";
import { ScrollView } from "react-native";
import ThemeContext from "../../theme";
import { useAuth } from "../hooks/authContext";
import { patchGameConfig } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Math.floor(Dimensions.get("window").width / 5) * 5 - 20;
const cellSize = screenWidth / 10;

const PrepareFormation: React.FC = () => {
  const auth = useAuth();

  const handleSaveFormation = async () => {
    try {
      const gameId = await AsyncStorage.getItem('gameId');

    if (!gameId) {
      throw new Error('No game ID found');
    }

    // Make the API call to save the formation
    const response = await patchGameConfig(auth.token, gameId, ships);

    console.log(response);
    console.log(JSON.stringify(
      {"ships":ships}
  ));

    if (response.code == 400) {
      alert(response.message);
    } else
    if (response.code == 401) {
      alert(response.message);
    }
    else
    alert("Formation saved successfully");
    } catch (error) {
      // Display an error message
      alert("Failed to save formation. Please try again.");
    }
  };

  const { theme } = useContext(ThemeContext);

  <Button
    buttonStyle={{
      marginBottom: 20,
      marginLeft: 20,
      padding: 10,
      backgroundColor: theme,
      borderRadius: 20,
    }}
    title="Save Formation"
    onPress={handleSaveFormation}
  />

  const [grid, setGrid] = useState<string[][]>([]);
  const [ships, setShips] = useState<
    Array<{ x: string; y: number; size: number; direction: string }>
  >([]);
  const [startSquare, setStartSquare] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [direction, setDirection] = useState<"HORIZONTAL" | "VERTICAL">(
    "HORIZONTAL"
  );
  const [length, setLength] = useState(2);
  

  // Initialize the grid with empty cells
  useState(() => {
    const initialGrid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => "")
    );
    setGrid(initialGrid);
  });

  const handleClearGrid = () => {
    // Clear the grid
    const clearedGrid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => "")
    );
    setGrid(clearedGrid);

    // Reset the ship configuration
    setShips([]);
  };

  const handleCellClick = (row: number, col: number) => {
    if (
      (direction === "HORIZONTAL" && col + length > grid[0].length) ||
      (direction === "VERTICAL" && row + length > grid.length)
    ) {
      alert("The ship exits the grid");
      return;
    }

    // Set the starting square of the ship
    setStartSquare({ row, col });

    // Place a battleship on the clicked cell
    const updatedGrid = [...grid];
    for (let i = 0; i < length; i++) {
      if (direction === "HORIZONTAL") {
        updatedGrid[row][col + i] = "B";
      } else {
        updatedGrid[row + i][col] = "B";
      }
    }
    setGrid(updatedGrid);

    // Add the new ship to the ships state
    setShips((prevShips) => {
      const newShips = [
        ...prevShips,
        {
          x: String.fromCharCode(65 + col),
          y: row + 1,
          size: length,
          direction: direction,
        },
      ];

      return newShips;
    });
  };

  const styles = StyleSheet.create({
    heading: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      textAlign: "center",
      color: theme,
    },
    container: {
      flex: 1,
      alignItems: "center",
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      width: screenWidth,
    },
    cell: {
      width: cellSize,
      height: cellSize,
      borderWidth: 1,
      borderColor: "black",
      justifyContent: "center",
      alignItems: "center",
    },
    coordinate: {
      textAlign: "center",
      color: "lightgrey",
    },
    occupied: {
      backgroundColor: theme,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Prepare Formation</Text>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <TouchableOpacity
              key={`${rowIndex}-${colIndex}`}
              style={[styles.cell, cell ? styles.occupied : null]}
              onPress={() => handleCellClick(rowIndex, colIndex)}
            >
              <Text style={styles.coordinate}>
                {String.fromCharCode(65 + colIndex)}
                {rowIndex + 1}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 18,
              fontWeight: "600",
              color: theme,
              textAlign: "center",
            }}
          >
            Direction
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme,
              borderRadius: 5,
              justifyContent: "center",
              marginHorizontal: 5,
            }}
          >
            <Picker
              selectedValue={direction}
              onValueChange={(itemValue) => setDirection(itemValue)}
              style={{ height: 30, width: 170 }}
            >
              <Picker.Item label="Horizontal" value="HORIZONTAL" />
              <Picker.Item label="Vertical" value="VERTICAL" />
            </Picker>
          </View>
        </View>

        <View>
          <Text
            style={{
              marginTop: 5,
              fontSize: 18,
              fontWeight: "600",
              color: theme,
              textAlign: "center",
            }}
          >
            Size
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme,
              borderRadius: 5,
              justifyContent: "center",
              marginHorizontal: 5,
            }}
          >
            <Picker
              selectedValue={length}
              onValueChange={(itemValue) => setLength(itemValue)}
              style={{ height: 30, width: 170 }}
            >
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
              <Picker.Item label="6" value={6} />
            </Picker>
          </View>
        </View>
      </View>

      <ScrollView
        horizontal={true}
        style={{ flexDirection: "row", padding: 20 }}
      >
        {ships.map((ship, index) => (
          <Card key={index} style={{ marginBottom: 10, marginRight: 10, backgroundColor:'white', borderColor: theme, borderWidth: 1 }}>
            <Card.Title
              style={{ marginBottom: -10, marginTop: 5 }}
              title={`Ship ${index + 1}`}
              titleStyle={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "900",
                color: theme,
              }}
            />
            <Card.Content style={{ marginBottom: -10 }}>
              <Text>
                Position: {ship.x}
                {ship.y}
              </Text>
              <Text>Length: {ship.size}</Text>
              <Text>Direction: {ship.direction}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                icon={{
                  name: "trash",
                  size: 20,
                  color: theme,
                  type: "font-awesome",
                }}
                buttonStyle={{
                  backgroundColor: "transparent",
                  borderRadius: 20,
                }}
                onPress={() => {
                  // Remove the ship from the ships state
                  setShips((prevShips) =>
                    prevShips.filter((s, i) => i !== index)
                  );

                  // Clear the corresponding cells in the grid state
                  setGrid((prevGrid) => {
                    const updatedGrid = [...prevGrid];
                    for (let i = 0; i < ship.size; i++) {
                      if (ship.direction === "HORIZONTAL") {
                        updatedGrid[ship.y - 1][
                          ship.x.charCodeAt(0) - "A".charCodeAt(0) + i
                        ] = "";
                      } else {
                        updatedGrid[ship.y - 1 + i][
                          ship.x.charCodeAt(0) - "A".charCodeAt(0)
                        ] = "";
                      }
                    }
                    return updatedGrid;
                  });
                }}
              />
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title="Clear Grid"
          onPress={handleClearGrid}
          buttonStyle={{
            marginBottom: 20,
            marginRight: 20,
            padding: 10,
            backgroundColor: theme,
            borderRadius: 20,
          }}
        />
        <Button
          buttonStyle={{
            marginBottom: 20,
            marginLeft: 20,
            padding: 10,
            backgroundColor: theme,
            borderRadius: 20,
          }}
          title="Start Game"
          onPress={() => {
            handleSaveFormation(  );
          }}
        />
      </View>
    </View>
  );
};

export default PrepareFormation;
