import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View, SafeAreaView, Text, TouchableOpacity  } from 'react-native';
import { colors } from '../utils/colors';
import { useUserContext } from '../context/UserContext';
import sharedStyles from '../utils/styles';

export default function SplashScreen({ navigation }){

    const userContext = useUserContext();

    useFocusEffect(
        React.useCallback(() => {
            if (userContext.authState.isLoading) {
                return
            }
            if (userContext.authState.isInitialized && userContext.authState.isConnected) {
                    navigation.navigate("MainStack")
                }
        }, [userContext.authState.isLoading])
    );


    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>

                <Image style={{ width: '70%', height: '20%', resizeMode: 'contain', marginBottom: '5%', marginTop: '5%'}} source={require('../assets/logo_typo.png')}></Image>
                <Image style={{ width: '100%', height: '50%', resizeMode: 'contain' }} source={require('../assets/splash_login/splash_background.png')}></Image>

                <View style={{ width: '100%', position: 'absolute', bottom: 20, alignItems: 'center' }}>
                
                    <TouchableOpacity  onPress={() => navigation.navigate('AuthStack', {isLogin: 'test'}) } style={{...sharedStyles.primaryButton.avalable, margin: '3%'}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>Inscription</Text>
                    </TouchableOpacity>

                    <TouchableOpacity  style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'normal', color: 'black' }}>Déjà membre ? <Text style={{fontWeight: 'bold'}}>Se connecter</Text></Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </View>
    );
}