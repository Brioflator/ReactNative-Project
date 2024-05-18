import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/Login.screen';
import RegisterScreen from '../screens/auth/Register.screen';
import { AuthRouteNames } from './route-names';
import { Text } from 'react-native'

const AuthStack = createNativeStackNavigator()

export default function AuthRoutes() {
    return(
        <AuthStack.Navigator initialRouteName='Login' screenOptions={{headerShown : false}}>
        <AuthStack.Screen name={AuthRouteNames.LOGIN} component={LoginScreen} options={{
            headerTitle: (props) => <Text {...props}>Login</Text>
        }}/>
        <AuthStack.Screen name={AuthRouteNames.REGISTER} component={RegisterScreen} options={{
            headerTitle: (props) => <Text {...props}>Register</Text>
        }}/>
    </AuthStack.Navigator>
    );
}