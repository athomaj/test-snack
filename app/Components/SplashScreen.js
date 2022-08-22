import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useUserContext } from '../context/UserContext';

import { getData, storeData } from '../utils/storage';
import { sharedStyles } from '../utils/styles';

export default function SplashScreen({ navigation }) {

    const userContext = useUserContext();

    async function hasConnectedBefore() {
        const footprint = await getData('alreadyConnected')
        
        if (!footprint) {
            storeData('alreadyConnected', 'true')
            navigation.replace('onboarding')
        }
        else navigation.navigate('Login', { isLogin: true })
    }

    useFocusEffect(
        React.useCallback(() => {
            // navigation.replace('SignUpStep3')
            if (userContext.authState.isLoading) {
                return
            }
            if (userContext.authState.isInitialized && userContext.authState.isConnected) {
                const user = userContext.authState.user
                if (user.sponsors?.length < 3) {
                    navigation.navigate('SearchContact', { goHome: true })
                } else {
                    navigation.navigate("MainStack")
                }
            } else {
                hasConnectedBefore()
            }
        }, [userContext.authState.isLoading, userContext.authState.isConnected])
    );

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...sharedStyles.h1 }}>FoodFood</Text>
            <Text style={{ ...sharedStyles.shortText, textAlign: 'center' }}>Texte de baseline ?</Text>
            <Text style={{ ...sharedStyles.shortText, textAlign: 'center' }}>(facultatif)</Text>
        </SafeAreaView>
    );
}
