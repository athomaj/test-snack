import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';

export default AuthContainer = ({ navigation }) => {

    // Voir pour utiliser un context const userContext = useUserContext();
    const [loading, setLoading] = React.useState(false)
    const [isLogin, setIsLogin] = React.useState(true)

    function loginRequest(email, pass) {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            navigation.navigate('MainStack')
        }, 1000)
    }

    function signUpRequest(name, email, pass) {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            navigation.navigate('MainStack')
        }, 1000)
    }

    function changeLoginStatus() {
        setIsLogin(!isLogin)
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ position: 'absolute', top: isIphoneX() ? 100 : 80, fontSize: 26, fontWeight: 'bold', color: colors.black }}>Bienvenue</Text>
            {isLogin ?
                <LoginComponent loading={loading} requestLogin={(email, pass) => loginRequest(email, pass)} loginStatus={changeLoginStatus} ></LoginComponent>
                :
                <SignUpComponent loading={loading} requestSignUp={(name, email, pass) => signUpRequest(name, email, pass)} loginStatus={changeLoginStatus} ></SignUpComponent>
            }
        </SafeAreaView>
    );
}