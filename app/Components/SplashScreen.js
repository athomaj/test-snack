import React from 'react';
import { Image, View, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { colors } from '../utils/colors';

export default SplashScreen = ({ navigation }) => {

    // Voir pour utiliser un context const userContext = useUserContext();
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        //Check User
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        setTimeout(() => {
            navigation.navigate('AuthStack')
            console.log('Splash Screen')
        }, 1500)
    }, [])

    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '80%', height: '50%', resizeMode: 'contain' }} source={require('../assets/logo-react-native.png')}></Image>
                <View style={{ position: 'absolute', bottom: 20, alignItems: 'center' }}>
                    <ActivityIndicator style={{ marginBottom: 10 }} animating={loading} hidesWhenStopped={true} size={'small'} color={colors.black} ></ActivityIndicator>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: colors.black, textAlign: 'center' }}>Bienvenue sur le Boiler Plate de{'\n'}React Native</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}