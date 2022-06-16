import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

import { colors } from '../utils/colors';

export default function AccountContainer({ navigation }) {

    React.useEffect(() => {
        console.log('Account')
    }, [])

    function disconnectTapped() {
        navigation.navigate('AuthStack')
    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.black }}>Page de compte</Text>
            <TouchableOpacity onPress={disconnectTapped} style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'normal', color: colors.red }}>Déconnexion</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}