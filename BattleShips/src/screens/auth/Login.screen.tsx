import { NavigationProp, useNavigation } from "@react-navigation/native"
import Login from "../../components/Login"
import { AuthRouteNames, GameRouteNames } from "../../router/route-names"
import { useAuth } from "../../hooks/authContext"

const LoginScreen = () => {
    const navigation = useNavigation<any>()
    const handleGoToRegister = () => {
        navigation.navigate(AuthRouteNames.REGISTER)
    }
    const handleSuccessfulLogin = () => {
        navigation.navigate('Game', { screen: GameRouteNames.LOBBY });
    };
    const auth = useAuth()
    return <Login onSubmit={auth.login} goToRegister={handleGoToRegister} onSuccessfulLogin={handleSuccessfulLogin}/> 
}

export default LoginScreen