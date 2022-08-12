import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import { BASE_URL } from '../config/config';

export default function PendingsContainer({ navigation, id }) {
    const userContext = useUserContext();
    const [userName, setUserName] = React.useState(null)
    const [numberPendings, setNumberPendings] = React.useState(null)

    React.useEffect(()=>{
        setUserName(`${userContext.authState.user.firstName} ${userContext.authState.user.lastName}`)
        setNumberPendings(userContext.authState.user.pendings.length > 0 ? userContext.authState.user.pendings : null)
        //console.log(userContext.authState.user.pendings)
    },[])

    const renderItem = React.useCallback(
        ({ item, index }) => {

        return(
        <View style={{width: '100%', paddingVertical: 8, paddingHorizontal: 15, ...sharedStyles.bottomCaesura, flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
        <Image source={{uri: item.avatarUrl}} style={{width: 50, height: 50, resizeMode: 'contain', borderRadius:40, marginRight:15}} />
            <View style={{height: 50, width: '50%'}}>
                <Text style={{...sharedStyles.h3}}>{item.firstName} {item.lastName}</Text>
                <TouchableOpacity
                onPress={() => { navigation.navigate('Profil',{ userId: item.id })}}
                ><Text style={{...sharedStyles.label, textDecorationStyle: 'solid', textDecorationColor: colors.primaryYellow, textDecorationLine: 'underline'}}>Consulter le profil</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={{padding: 15, backgroundColor: colors.secondaryColor, borderRadius:8}}>
                <Text>Accepter</Text>
            </TouchableOpacity>
        </View>)
    }
    , []
    )

    React.useEffect(() => {
        if (!userContext.authState.isConnected) {
            navigation.replace('AuthStack')
        }
    }, [userContext.authState.isConnected])

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
            <FlatList
                ListHeaderComponent={
                    <View style={{backgroundColor: colors.secondaryColor, width: '100%', height: 50, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={navigation.goBack} style={{ position: 'absolute', left: 10, height: 30, width: 40, justifyContent: 'center' }}>
                        <Image style={{ height: '60%', width: '80%', resizeMode: 'contain' }} source={require('../assets/icon/return_icon.png')}></Image>
                    </TouchableOpacity>
                        <Text style={{...sharedStyles.shortText}}>Vos demandes en attentes</Text>
                    </View>
                }
                style = {{width: '100%', height: '100%'}}
                data = {numberPendings}
                renderItem = {renderItem}
            />

        </SafeAreaView>
    );
}