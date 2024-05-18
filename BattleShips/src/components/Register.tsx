import React, { useState, useContext } from "react";
import { View, Text, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AuthRouteNames } from "../router/route-names";
import ThemeContext from "../../theme";

export interface IRegister {
  onSubmit: (email: string, password: string) => void;
}

const Register: React.FC<IRegister> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext); 
  const onToggleSnackBar = () => setVisible(!visible);

  const handleSubmit = () => {
    onSubmit(email, password);
    onToggleSnackBar();
  };

  const handleActionPress = () => {
    onToggleSnackBar();
    navigation.navigate(AuthRouteNames.LOGIN as never);
  };

  const handleBackPress = () => {
    navigation.navigate(AuthRouteNames.LOGIN as never);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 50 }}>
      <Text
        style={{
          textAlign: "center",
          color: theme,
          fontSize: 34,
          fontWeight: "900",
          padding: 10,
        }}
      >
        REGISTER
      </Text>
      <Input
        placeholder="Email"
        leftIcon={{ type: "font-awesome", name: "envelope", color: theme }}
        onChangeText={(value) => setEmail(value)}
        value={email}
      />
      <Input
        placeholder="Password"
        leftIcon={{ type: "font-awesome", name: "lock", color: theme }}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      <View style={{ padding: 20 }}></View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title="Register"
          onPress={handleSubmit}
          buttonStyle={{ backgroundColor: theme, borderRadius: 20 }}
        />
        <Button
          icon={{
            name: "arrow-left",
            size: 20,
            color: theme,
            type: "font-awesome",
          }}
          onPress={handleBackPress}
          buttonStyle={{ backgroundColor: "transparent", borderRadius: 20 }}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Snackbar
          visible={visible}
          onDismiss={onToggleSnackBar}
          rippleColor={theme}
          action={{
            label: "Log In",
            onPress: handleActionPress,
          }}
        >
          You have successfully registered. Please login.
        </Snackbar>
      </View>
    </View>
  );
};

export default Register;
