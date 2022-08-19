import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SmallIcon, Tr } from '../Components/Utils/tools';

import { useUserContext } from '../context/UserContext';
import userApi from '../services/userApi';

import { sharedStyles } from '../utils/styles';
import { colors } from '../utils/colors';

export default function ProfilContainer({ route, navigation }) {
    const userContext = useUserContext();

    const [userData, setUserData] = React.useState(null)
    const [commonBetweenUser, setCommonBetweenUser] = React.useState([])
    const [pendingsUser, setPendingsUser] = React.useState(false)

    React.useEffect(()=>{
        getData(route.params.userId)
    },[])

    React.useEffect(()=>{
         userData ? setPendingsUser(userContext.authState.user.pendings.find(element => element.id === userData.id )? true : false) : null
        // console.log('USER DATA ==========================>',userData)
        
        commonUser()
    },[userData])

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
        }
    }

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
        <SafeAreaView style={profilStyles.safeAreaView}>
        { userData &&
            <ScrollView style={profilStyles.scrollView}>
                <View style={{height: 50, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
                    <TouchableOpacity onPress={navigation.goBack} style={{ position: 'absolute', left: 10, height: 30, width: 50, justifyContent: 'center',alignItems: 'center'}}>
                        <Image style={{height: '60%', width: '100%', resizeMode: 'contain'}} source={require('../assets/icon/return_icon.png')}></Image>
                    </TouchableOpacity>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Profil</Text>
                </View>
                <View style={profilStyles.userPictureContainer}>
                    {userData &&
                        <Image
                            style={profilStyles.userPicture}
                            source={{uri : userData.avatarUrl}}
                        />
                    }
                    <Text style={{...sharedStyles.h2, paddingTop: 13}}>{userData.username}</Text>
                    { pendingsUser &&
                        <View style={{width: '100%', paddingTop: 8, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 8, borderRadius: 4, borderStyle: 'solid', borderWidth: 1, borderColor:  colors.primaryYellow}}>
                            <Text style={{color: colors.primaryYellow}}>Refuser</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{paddingVertical: 8, backgroundColor: colors.primaryYellow, borderRadius: 4, paddingHorizontal: 20}}
                        ><Text style={{color: 'white'}}>Accepter</Text></TouchableOpacity>
                        </View>
                    }
                </View>

                <View style={profilStyles.blockContainer}>
                    { commonBetweenUser.length > 0 ?
                    <>
                    <Text style={profilStyles.h4}>Vous avez {commonBetweenUser.length} connsaissance{commonBetweenUser.length > 1 ? 's' : null} en commun</Text>
                        <FlatList 
                            style ={{width: '100%', height: 40}}
                            horizontal = {true}
                            data = {commonBetweenUser}
                            renderItem = {renderCommonUser}
                        />
                        </>
                        :
                        <Text style={profilStyles.h4}>Aucune connaissance en commun</Text>
                    }
                </View>

                <View style={profilStyles.blockContainer}>
                        <Text style={profilStyles.h4}>Quelques mot sur {userData.firstName}</Text>
                        <Text style={profilStyles.p}>{userData.description}</Text>
                </View>

                <View style={profilStyles.blockContainer}>
                        <Text style={profilStyles.h4}>Péché mignon :</Text>
                        <Text style={profilStyles.p}>{userData.guiltyPleasure}</Text>
                </View>

                <View style={profilStyles.blockContainer}>
                        <Text style={profilStyles.h4}>{userData.username} Aime la cuisine:</Text>
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

                <View style={profilStyles.blockContainer}>
                    <Text style={profilStyles.h4}>Régime{userData.diet > 1 ? 's' : null} alimentaire de {userData.firstName}</Text>
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

            </ScrollView>
        }
        </SafeAreaView>
    );
}

const profilStyles = StyleSheet.create({
    safeAreaView: {
        height: '100%', width: '100%', alignItems: 'center', backgroundColor: colors.white 
    },
    scrollView: {
        width: '100%', height:'100%', backgroundColor: 'white'
    },
    userPictureContainer: {
        backgroundColor: colors.secondaryBlue, paddingTop: 48, width: '100%', justifyContent: 'center', alignItems: 'center', paddingBottom: 25
    },
    userPicture: {
        width: 156, height: 156, borderRadius: 78, borderColor: colors.primaryYellow, borderWidth: 3
    },
    blockContainer: {
        paddingHorizontal: 10,
        paddingVertical:8,
        borderBottomColor: colors.primaryYellow,
        borderStyle: 'solid',
        borderBottomWidth: 0.5
    },
    h4: {
        fontWeight: '600',
        fontSize: 16,
        color: '#005DB2',
        paddingBottom:8
    },
    p : {
        fontSize: 14,
        fontWeight: '400',
        width:'100%',
    }
})