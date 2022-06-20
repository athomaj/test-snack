import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';

export default function AuthContainer({ navigation, route }) {

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

    React.useEffect(()=>{
        console.log(route)
        return
        setIsLogin(route)
    })

    function changeLoginStatus() {
        setIsLogin(!isLogin)
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {isLogin ?
                <LoginComponent loading={userContext.authState.isLoading} error={errorMessage} requestLogin={(email, pass) => userContext.login(email, pass)} loginStatus={changeLoginStatus} ></LoginComponent>
                :
                <SignUpComponent loading={userContext.authState.isLoading} error={errorMessage} requestSignUp={(name, email, pass) => userContext.register(name, email, pass)} loginStatus={changeLoginStatus} ></SignUpComponent>
            }
        </SafeAreaView>
    );
}