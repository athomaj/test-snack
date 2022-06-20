import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
import { colors } from '../utils/colors';
import { isIphoneX } from '../utils/isIphoneX';

export default  function RegisterContainer({ navigation }) {

    // Voir pour utiliser un context const userContext = useUserContext();
    const [loading, setLoading] = React.useState(false)
    const [isLogin, setIsLogin] = React.useState(true)
    const [stepRegister, setStep] = React.useState(0)

    function loginRequest(email, pass) {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            navigation.navigate('MainStack')
        }, 1000)
    }

    function incremmentStep(actionStep){
        if(stepRegister > 0 && actionStep === 'retrun')
        {
            setStep(stepRegister-1)
        }
        else if(stepRegister < 4 && actionStep === 'up')
        {
            setStep(stepRegister+1)
        }
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

            {isLogin ?
                <SignUpComponent loading={loading} requestLogin={(email, pass) => loginRequest(email, pass)} loginStatus={changeLoginStatus} ></SignUpComponent>
                :
                <LoginComponent loading={loading} requestSignUp={(name, email, pass) => signUpRequest(name, email, pass)} loginStatus={changeLoginStatus} ></LoginComponent>
            }
        </SafeAreaView>
    );
}