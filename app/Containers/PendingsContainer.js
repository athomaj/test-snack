import React from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import userApi from '../services/userApi';

export default function PendingsContainer({ navigation }) {
    const userContext = useUserContext();

    const [pendings, setPendings] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(()=>{
        fetchData()
    },[])

    async function fetchData() {
        try {
            const currentUser = await userApi.getMe()
            setPendings(currentUser.data.pendings)
        } catch (error) {
            console.log(error, "ERR GET USER PENDINGS ====")
        }
    }

    async function acceptPending(item) {
        try {
            setLoading(true)
            const arrayReferrals = userContext.authState.user.referrals.flatMap((referralItem) => ({id: referralItem.id}))
            const arrayPendings = userContext.authState.user.pendings.flatMap((pendingItem) => ({id: pendingItem.id}))

            const indexOf = arrayPendings.findIndex(pendingItem => pendingItem.id === item.id)
            arrayPendings.splice(indexOf, 1)
            
            const res =  await userApi.updateUser({
                    referrals: [...arrayReferrals, {id: item.id}],
                    pendings: arrayPendings,
            }, userContext.authState.user.id)
            // await notificationApi.deleteNotification(item.id);
            
            fetchData()
            await userContext.getCurrentUser(false)
            setLoading(false)
        } catch (error) {
            console.log(error, "ACCEPT NOTIF ERR =====")
        }
    }

    const renderItem = React.useCallback(
        ({ item, index }) => {

        return(
        <View style={{width: '100%', paddingVertical: 8, paddingHorizontal: 15, ...sharedStyles.bottomCaesura, flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
            <Image source={{uri: item.avatarUrl}} style={{width: 50, height: 50, resizeMode: 'cover', borderRadius:25, marginRight:15}} />
            <View style={{ width: '50%'}}>
                <Text style={{...sharedStyles.h3}}>{item.username}</Text>
                <TouchableOpacity
                onPress={() => { navigation.navigate('Profil',{ userId: item.id })}}
                ><Text style={{...sharedStyles.label, textDecorationStyle: 'solid', textDecorationColor: colors.darkGreen, textDecorationLine: 'underline'}}>Consulter le profil</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => acceptPending(item)} style={{padding: 15, backgroundColor: colors.secondaryColor, borderRadius:8}}>
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
                data = {pendings}
                renderItem = {renderItem}
            />

            {loading &&
                <View style={{position: 'absolute', top: 0, zIndex: 1,height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
                    <ActivityIndicator animating={loading} color={colors.black} hidesWhenStopped={false}></ActivityIndicator>
                </View>
            }
        </SafeAreaView>
    );
}