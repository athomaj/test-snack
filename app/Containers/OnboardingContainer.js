import React from 'react';
import { SafeAreaView, View } from 'react-native';
import LoginComponent from '../Components/LoginComponent';
import SignUpComponent from '../Components/SignUpComponent';
import { useUserContext } from '../context/UserContext';
import { getData, storeData } from '../utils/storage';

export default function OnboardingContainer({ navigation, route }) {

    const userContext = useUserContext();

    useFocusEffect(
        React.useCallback(() => {
            if (userContext.authState.isLoading) {
                return
            }
            if (userContext.authState.isInitialized && userContext.authState.isConnected) {
                const user = userContext.authState.user
                if (user.sponsors.length < 3) {
                    navigation.navigate('Login', { isLogin: false })
                } else {
                    navigation.navigate("MainStack")
                }
            }
        }, [userContext.authState.isLoading, userContext.authState.isConnected])
    );

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
            <View style={{ height: '100%', width: '100%', alignItems: 'center' }}>

                <Image style={{ height: '20%', width: '70%', resizeMode: 'contain', marginBottom: '5%', marginTop: '5%' }} source={require('../assets/logo_typo.png')}></Image>
                <Image style={{ height: '50%', width: '100%', resizeMode: 'contain' }} source={require('../assets/splash_login/splash_background.png')}></Image>

                <View style={{ width: '100%', position: 'absolute', bottom: 10, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login', { isLogin: false })} style={{ ...sharedStyles.primaryButtonWithColor, marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Inscription</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login', { isLogin: true })} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Déjà membre ? <Text style={{ fontWeight: 'bold' }}>Se connecter</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}