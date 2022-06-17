import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';

export default AuthContainer = ({ navigation }) => {

    const userContext = useUserContext();

    const [isLogin, setIsLogin] = React.useState(true)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        if (userContext.authState.isConnected) {
            navigation.navigate('MainStack')
        }
        if (userContext.authState.errorMessage){
            setErrorMessage(userContext.authState.errorMessage);
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    function changeLoginStatus() {
        setIsLogin(!isLogin)
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ position: 'absolute', top: isIphoneX() ? 100 : 80, fontSize: 26, fontWeight: 'bold', color: colors.black }}>Bienvenue</Text>
            {isLogin ?
                <LoginComponent loading={userContext.authState.isLoading} error={errorMessage} requestLogin={(email, pass) => userContext.login(email, pass)} loginStatus={changeLoginStatus} ></LoginComponent>
                :
                <SignUpComponent loading={userContext.authState.isLoading} error={errorMessage} requestSignUp={(name, email, pass) => userContext.register(name, email, pass)} loginStatus={changeLoginStatus} ></SignUpComponent>
            }
        </SafeAreaView>
    );
}