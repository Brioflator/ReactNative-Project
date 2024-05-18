import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserRouteNames } from './route-names';
import { Text } from 'react-native'
import ProfileScreen from '../screens/userInfo/Profile.screen';
import SettingsScreen from '../screens/userInfo/Settings.screen';

const UserStack = createNativeStackNavigator()

export default function UserRoutes() {
    return(
    <UserStack.Navigator initialRouteName='Profile' screenOptions={{headerShown : false}}>
        <UserStack.Screen name={UserRouteNames.PROFILE} component={ProfileScreen} options={{
        }}/>
        
        <UserStack.Screen name={UserRouteNames.SETTINGS} component={SettingsScreen} options={{
        }}/>

    </UserStack.Navigator>
    );
}