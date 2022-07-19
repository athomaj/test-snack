import React from 'react';
import { Image, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getData, storeData, deleteData } from '../utils/storage';
import { useUserContext } from '../context/UserContext';
import { sharedStyles } from '../utils/styles';

export default function SplashScreen({ navigation }) {

    const userContext = useUserContext();

    async function hasConnectedBefore(){
        navigation.navigate('SignUpStep1')
        return
        const footprint = await getData('alreadyConnected')
        console.log(footprint)
        if(!footprint){
            console.log('IN ELSE IF')
            storeData('alreadyConnected', 'true')
            navigation.replace('onboarding')
        }
        else console.log('VARIABLE IN STORAGE',footprint)
    }

    useFocusEffect(
         React.useCallback(() => {
            if (userContext.authState.isLoading) {
                hasConnectedBefore()
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
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{...sharedStyles.titleH1}}>FoodFood</Text>
            <Text style={{...sharedStyles.shortText, textAlign: 'center'}}>Texte de baseline ?</Text>
            <Text style={{...sharedStyles.shortText, textAlign: 'center'}}>(facultatif)</Text>
        </SafeAreaView>
    );
}
