import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import authApi from '../services/authApi';
import { useUserContext } from '../context/UserContext';

import { colors } from '../utils/colors';

export default AccountContainer = ({ navigation }) => {

    const userContext = useUserContext();

    React.useEffect(() => {
        console.log('Account')
    }, [])

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.navigate('AuthStack')
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.black }}>Page de compte</Text>
            <TouchableOpacity onPress={userContext.disconnect} style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'normal', color: colors.red }}>Déconnexion</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}