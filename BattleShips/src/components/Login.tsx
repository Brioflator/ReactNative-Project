import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { Text } from "react-native";
import ThemeContext from "../../theme";

export interface ILogin {
  onSubmit: (email: string, password: string) => void;
  goToRegister: () => void;
  onSuccessfulLogin: () => void;
}

const Login: React.FC<ILogin> = ({
  onSubmit,
  goToRegister,
  onSuccessfulLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleSubmit = async () => {
    await onSubmit(email, password);
    onSuccessfulLogin();
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
        LOGIN
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
      <View style={{ padding: 10 }}></View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title="Login"
          onPress={handleSubmit}
          buttonStyle={{ backgroundColor: theme, borderRadius: 20 }}
        />
        <Button
          title="Register"
          onPress={goToRegister}
          buttonStyle={{ backgroundColor: theme, borderRadius: 20 }}
        />
      </View>
    </View>
  );
};

export default Login;
