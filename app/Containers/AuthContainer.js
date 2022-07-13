import React from 'react';
import { SafeAreaView, View } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
import { useUserContext } from '../context/UserContext';
import { getData, storeData } from '../utils/storage';

export default function AuthContainer({ navigation, route }) {

    const userContext = useUserContext();

    const [isLogin, setIsLogin] = React.useState(route.params?.isLogin)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        
        if (userContext.authState.isConnected && isLogin) {
            navigation.replace('MainStack')
        }
        if (userContext.authState.errorMessage) {
            setErrorMessage(userContext.authState.errorMessage);
            if(!getData('alreadyConnected')){
                storeData('alreadyConnected', true)
                navigate.replace('')
            }
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage, isLogin])

    function changeLoginStatus() {
        setIsLogin(!isLogin)
    }

    function searchContact(search) {
        if (search) {
            navigation.navigate('SearchContact')
        } else {
            navigation.replace('MainStack')
        }
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ height: '100%', width: '100%' }}>
                {isLogin ?
                    <LoginComponent loading={userContext.authState.isLoading} error={errorMessage} requestLogin={(email, pass) => userContext.login(email, pass)} loginStatus={changeLoginStatus} ></LoginComponent>
                    :
                    <SignUpComponent loading={userContext.authState.isLoading} error={errorMessage} requestSignUp={(data) => userContext.register(data)} loginStatus={changeLoginStatus} userContext={userContext} searchContact={searchContact} ></SignUpComponent>
                }
            </View>
        </SafeAreaView>
    );
}