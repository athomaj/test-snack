import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useUserContext } from '../context/UserContext';

import { colors } from '../utils/colors';

export default MembersContainer = ({ navigation }) => {

    const userContext = useUserContext();

    React.useEffect(() => {
        console.log('Members', userContext)
    }, [])

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.navigate('AuthStack')
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.black }}>Membres</Text>
        </SafeAreaView>
    );
}