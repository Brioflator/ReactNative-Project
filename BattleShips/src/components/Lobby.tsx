import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useAuth } from "../hooks/authContext";
import ThemeContext from '../../theme';

export interface LobbyProps {
    goToProfile: () => void;
    goToGameFinder: () => void;
    goToShowGames: () => void;
}


const Lobby: React.FC<LobbyProps> = ({goToProfile, goToGameFinder, goToShowGames}) => {

    const auth = useAuth();
    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 50 }}>
            <Button title="User Profile" onPress={goToProfile} buttonStyle={{backgroundColor : theme, borderRadius: 30, margin:20, padding:20}} />
            <Button title="Find Games" onPress={goToGameFinder} buttonStyle={{backgroundColor : theme, borderRadius: 30, margin:20, padding:20}} />
            <Button title="Show Games" onPress={goToShowGames} buttonStyle={{backgroundColor : theme, borderRadius: 30, margin:20, padding:20}} />
            <Button title="Sign Out" onPress={auth.signOut} buttonStyle={{backgroundColor : theme, borderRadius: 30, margin:20, padding:20}} />
        </View>
    );
};

export default Lobby;