import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useUserContext } from '../context/UserContext';
import userApi from '../services/userApi';

import { colors } from '../utils/colors';

export default function ActivityContainer({ navigation }) {

    const userContext = useUserContext();

    React.useEffect(() => {
        (async () => {
        console.log('USER CONTACT ID ------->',userContext.authState.user.id)
        const userData = await userApi.getMePopulate(userContext.authState.user.id)
        console.log('INFORMATION USER ----->',userData)
        })();
    }, [])

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.navigate('AuthStack')
        }
    }, [userContext.authState.isConnected, userContext.authState.errorMessage])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.black }}>Activité</Text>

        </SafeAreaView>
    );
}