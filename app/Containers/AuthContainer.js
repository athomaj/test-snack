import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import { useUserContext } from '../context/UserContext';
import { getData, storeData } from '../utils/storage';

export default function AuthContainer({ navigation, route }) {
    const userContext = useUserContext();

    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        if (userContext.authState.isConnected && userContext.authState.isLoginScreen) {
            navigation.replace('SearchContact')
        }
        if (userContext.authState.errorMessage) {
            setErrorMessage(userContext.authState.errorMessage);
            if (!getData('alreadyConnected')) {
                storeData('alreadyConnected', true)
                navigate.replace('login')
            }
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <LoginComponent
                loading={userContext.authState.isLoading}
                error={errorMessage}
                requestLogin={(email, pass) => userContext.login(email, pass)}
                loginStatus={() => navigation.navigate('SignUpStep1')}
            >
            </LoginComponent>
        </SafeAreaView>
    );
}