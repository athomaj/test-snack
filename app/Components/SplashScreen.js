import React from 'react';
import { Image, SafeAreaView, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useUserContext } from '../context/UserContext';
import { getData, storeData } from '../utils/storage';
import { sharedStyles } from '../utils/styles';
import { colors } from '../utils/colors';

export default function SplashScreen({ navigation }) {

    const userContext = useUserContext();

    async function hasConnectedBefore() {
        const footprint = await getData('alreadyConnected')
        
        if (!footprint) {
            storeData('alreadyConnected', 'true')
            navigation.replace('onboarding')
        }
        else navigation.navigate('onboarding')
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
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundColor}}>
            <Image source={require('../assets/logo.png')} style={{width: "50%", resizeMode: "contain"}}/>
            <Image source={require('../assets/onboarding/SplashScreenTop.png')} style={{...styles.pictureSplashScreen, top: 0}}/>
            <Image source={require('../assets/onboarding/SplashScreenDawn.png')} style={{...styles.pictureSplashScreen, bottom: 0}}/>
            
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    pictureSplashScreen: {
        width: '100%', height: '37%', position: 'absolute', resizeMode: 'cover'
    }
})