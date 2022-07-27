import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import { BASE_URL } from '../config/config';

export default function PendingsContainer({ navigation }) {
    const userContext = useUserContext();
    const [userName, setUserName] = React.useState(null)
    const [numberPendings, setNumberPendings] = React.useState(null)

    React.useEffect(()=>{
        setUserName(`${userContext.authState.user.firstName} ${userContext.authState.user.lastName}`)
        setNumberPendings(userContext.authState.user.pendings.length > 0 ? userContext.authState.user.pendings.length : null)
        console.log(userContext.authState.user.pendings)
    },[])

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.replace('AuthStack')
        }
    }, [userContext.authState.isConnected])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
            <FlatList

            />

        </SafeAreaView>
    );
}