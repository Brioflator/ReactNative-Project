import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import authRoutes from "./auth.router";
import { useAuth } from "../hooks/authContext";
import GameRoutes from "./game.router";
import UserRoutes from "./userInfo.router";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MainStack = createNativeStackNavigator();

const Router: React.FC  = () => {
    const auth = useAuth();
    return (
        <NavigationContainer>
            <MainStack.Navigator>
                {auth.token ? (
                    <>
                        <MainStack.Screen name="Game" component={GameRoutes} />
                        <MainStack.Screen name="User" component={UserRoutes} />
                    </>
                ) : (
                    <MainStack.Screen name="Auth" component={authRoutes} />
                )}
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default Router;