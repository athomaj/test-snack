import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useUserContext } from '../context/UserContext';
import { colors } from '../utils/colors';
import { sharedStyles } from '../utils/styles';
import { BASE_URL } from '../config/config';
import userApi from '../services/userApi';
import { SmallIcon, Tr } from '../Components/Utils/tools';

export default function ProfilContainer({ route, navigation }) {
    const userContext = useUserContext();
    const [userData, setUserData] = React.useState(null)
    const [commonBetweenUser, setCommonBetweenUser] = React.useState([])

    async function getData(userId){
        const dataOfUser = await  userApi.getUserPopulate(userId)
        setUserData(dataOfUser)
    }

    function commonUser(){
        if(userData)
        {
        let ArrayOfuser = []
        const DataCommonUser =[]
        if(userContext.authState.user.sponsors.length > 0)
        {
            userContext.authState.user.sponsors.forEach(element => {
                ArrayOfuser.push(element.id)
            });
        }
        if(userContext.authState.user.referrals.length > 0)
        {
            userContext.authState.user.referrals?.forEach(element =>{
                ArrayOfuser.includes(element.id) ? null : ArrayOfuser.push(element.id)
            })
        }
        if(ArrayOfuser.length > 0)
        {
            userData.referrals.forEach( element => {
                if(ArrayOfuser.includes(element.id)){
                    DataCommonUser.push(element)
                    const indexOfid = ArrayOfuser.indexOf(element.id)
                    ArrayOfuser.splice(indexOfid,1)
                }
            })
            userData.sponsors.forEach(element => {
                if(ArrayOfuser.includes(element.id)){
                    DataCommonUser.push(element)
                }
            })

            setCommonBetweenUser(DataCommonUser)
        }
        // ArrayOfuser.map( idUser => {
        //     if(dataOfUser.)
        // })
        }
    }

    React.useEffect(()=>{
        
        getData(route.params.userId)
    },[])

    React.useEffect(()=>{
        userData ? console.log(userData.kitchen) : null
        // console.log('USER DATA ==========================>',userData)
        commonUser()
    },[userData])


    const renderCommonUser = React.useCallback(
        ({ item, index }) => {

        return(
            <TouchableOpacity
             onPress={() => { navigation.replace('Profil',{ userId: item.id })}}
            >
                <Image source={{uri: item.avatarUrl}} style={{width: 40, height: 40, resizeMode: 'contain', borderRadius:20, marginRight:8}} />
            </TouchableOpacity>)
    }
    , []
    )

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white' }}>
        { userData &&
            <ScrollView style={{width: '100%', height:'100%'}}>
            <View style={{width: '100%', height: '100%'}}>

                <View style={{...sharedStyles.bottomCaesura, backgroundColor: colors.secondaryBlue, paddingTop: 48, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 25}}>
                    <Image
                        style={{width: 156, height: 156, borderRadius: 128, borderColor: colors.primaryYellow, borderWidth: 3}}
                        source={{
                            uri : userData.avatarUrl
                        }}
                    />
                    <Text style={{...sharedStyles.h2, paddingTop: 13}}>{userData.username}</Text>
                </View>


                { commonBetweenUser.length > 0 ?
                    <View style={{ paddingHorizontal: 15, paddingVertical: 8}}>
                    <Text style={{...sharedStyles.h4, paddingBottom: 8}}>Vous avez {commonBetweenUser.length} connsaissance{commonBetweenUser.length > 1 ? 's' : null} en commun</Text>
                        <FlatList 
                            style ={{width: '100%', height: 40}}
                            horizontal = {true}
                            data = {commonBetweenUser}
                            renderItem = {renderCommonUser}
                        />
                        </View>
                    : <Text style={{...sharedStyles.h4}}>Aucune connaissance en commun</Text>
                }
                <Tr></Tr>


                <View style={{ paddingHorizontal: 15}}>
                        <Text style={{...sharedStyles.h4, paddingBottom:8}}>Quelques mot sur {userData.firstName}</Text>
                        <Text style={{fontSize: 14, fontWeight: '400', width:'100%', }}>{userData.presentation}</Text>
                </View>

                <Tr></Tr>
                <View style={{ paddingHorizontal: 15}}>
                        <Text style={{...sharedStyles.h4, paddingBottom:8}}>Péché mignon : <Text style={{fontSize: 14, fontWeight: '400'}}>{userData.pleasure}</Text></Text>
                        <Text style={{...sharedStyles.h4, paddingBottom:8}}>{userData.firstName} aime la cuisine:</Text>
                        <FlatList
                            style ={{width: '100%', height: 100}}
                            data = {userData.kitchen}
                            horizontal = {true}
                            renderItem = {({item, index}) => {
                                return(
                                    <View style={{marginRight: 8}}>
                                    <SmallIcon label={item.name}></SmallIcon>
                                    </View>
                                )
                            }}
                        />
                </View>
                <Tr></Tr>
                <View style={{ paddingHorizontal: 15}}>
                    <Text style={{...sharedStyles.h4, paddingBottom:8}}>Régime{userData.diet > 1 ? 's' : null} alimentaire de {userData.firstName}</Text>
                    <FlatList
                            style ={{width: '100%', height: 100}}
                            data = {userData.diet}
                            horizontal = {true}
                            renderItem = {({item, index}) => {
                                return(
                                    <View style={{marginRight: 8}}>
                                    <SmallIcon label={item.name}></SmallIcon>
                                    </View>
                                )
                            }}
                        />
                </View>


            </View>
            </ScrollView>
        }
        </SafeAreaView>
    );
}