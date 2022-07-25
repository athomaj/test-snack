import React from 'react';
import { Image, View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getData, storeData, deleteData } from '../utils/storage';
import { useUserContext } from '../context/UserContext';
import { sharedStyles } from '../utils/styles';

export default function SplashScreen({ navigation }) {

    const userContext = useUserContext();

    async function hasConnectedBefore(){
  
        const footprint = await getData('alreadyConnected')
        console.log(footprint)
        if(!footprint){
            console.log('IN FOOTPRINT')
            storeData('alreadyConnected', 'true')
            navigation.replace('onboarding')
        }
        // else navigation.replace('onboarding')
        else navigation.navigate('Login',{isLogin: true})
    }

    useFocusEffect(
         React.useCallback(() => {
            if (userContext.authState.isLoading) {
                return
            }
            if (userContext.authState.isInitialized && userContext.authState.isConnected) {
                const user = userContext.authState.user
                if (user.sponsors?.length < 3) {
                    navigation.navigate('SearchContact')
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
            <Text style={{...sharedStyles.titleH1}}>FoodFood</Text>
            <Text style={{...sharedStyles.shortText, textAlign: 'center'}}>Texte de baseline ?</Text>
            <Text style={{...sharedStyles.shortText, textAlign: 'center'}}>(facultatif)</Text>
        </SafeAreaView>
    );
}
