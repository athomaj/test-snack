import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Image, View, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { colors } from '../utils/colors';

export default SplashScreen = ({ navigation }) => {

    const userContext = useUserContext();

    useFocusEffect(
        React.useCallback(() => {
            if (userContext.authState.isLoading) {
                return
            }
            if (userContext.authState.isInitialized) {
                if (userContext.authState.isConnected) {
                    navigation.navigate("MainStack")
                } else {
                    setTimeout(() => {
                        navigation.navigate('AuthStack')
                    }, 1500)
                }
            } else {
                setTimeout(() => {
                    navigation.navigate('AuthStack')
                }, 1500)
            }
        }, [userContext.authState.isLoading])
    );

    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '80%', height: '50%', resizeMode: 'contain' }} source={require('../assets/logo-react-native.png')}></Image>
                <View style={{ position: 'absolute', bottom: 20, alignItems: 'center' }}>
                    <ActivityIndicator style={{ marginBottom: 10 }} animating={userContext.authState.isLoading} hidesWhenStopped={true} size={'small'} color={colors.black} ></ActivityIndicator>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: colors.black, textAlign: 'center' }}>Bienvenue sur le Boiler Plate de{'\n'}React Native</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}