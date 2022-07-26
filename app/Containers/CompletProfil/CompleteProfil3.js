import React, { Component } from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image, Switch, StyleSheet, Modal, Alert, Dimensions, FlatList, ScrollView, InteractionManager } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import Link from '../../Components/Utils/Link';
import dietApi from '../../services/dietApi';
import { useUserContext } from '../../context/UserContext';



export default function SignUpStep3Container({ navigation }) {

    const userContext = useUserContext();
    const [buttonDisable, setDisabledButton] = React.useState(true)
    const WIDTHCONTAINER = (Dimensions.get('window').width/3)-21;
    const [regime, setregime] = React.useState([])
    const [diets, setDiets] = React.useState(null)
    const [data, setData] = React.useState(null)

    async function getAlldiets(){
        const resultOfdata = await dietApi.getAllDiets();
        resultOfdata.data ? setDiets(resultOfdata.data) : null
    }
    React.useEffect( () => {
        getAlldiets()
    },[])

    React.useEffect(()=>{
        regime?.length > 0 ? setDisabledButton(false) : setDisabledButton(true)
        const request = {
            "diet": regime
        }
        setData(request);

    },[regime])

    function updateRegime(item){
         const modifyArray =  regime?.length > 0 ? [...regime] : []
        if(modifyArray.length > 0 )
        {
            modifyArray.includes(item.id) ? modifyArray.splice(modifyArray.indexOf(item.id), 1)  : modifyArray.push(item.id)

        }
        else  modifyArray.push(item.id)
        setregime(modifyArray)
    }

    
  
    const renderItem = React.useCallback(
        ({ item, index }) => {
            return(
            <TouchableOpacity onPress={() => updateRegime(item)} style={{backgroundColor: regime.includes(item.id) ? colors.primaryYellow : '#E6EFF7', height: WIDTHCONTAINER, width:WIDTHCONTAINER, borderRadius: 4, marginBottom: 12, justifyContent:'center', alignItems: 'center'}}>
                { regime.includes(item.id) ?
                <Image source={require('../../assets/icon/whiteCarrot.png')} style={{width: 35, height: 35, resizeMode: 'contain'}} />
                :
                <Image source={require('../../assets/icon/blueCarrot.png')} style={{width: 35, height: 35, resizeMode: 'contain'}}/>
                }
                <Text style={{
                    fontSize: 13,
                    color: regime.includes(item.id) ? 'white' : colors.primaryYellow,
                    fontWeight: '500',}}
                >{item.attributes.name}</Text>
                
            </TouchableOpacity>)},
        [regime]
    );

    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 80 }}>
                <SignupFooterNav disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('UpdateProfil4')} updatecontext={()=> userContext.updateUserInformation(data)} ></SignupFooterNav>


                <ScrollView style={{ width: '100%', height: '100%'}} scrollEnabled={false}>
                    <Text style={{...sharedStyles.h2, width: '100%'}}>Régime alimentaire</Text>
                    <Text style={{...sharedStyles.shortText, height:55}}>Phrase de description</Text>
                    <FlatList
                    data={diets}
                    renderItem={renderItem}
                    style={{ width: '100%'}}
                    horizontal={false}
                    numColumns= {3}
                    keyExtractor={item => item.id}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                <Text style={{...sharedStyles.label, paddingTop: 15}}>Votre régime alimentaire n’est dans la liste ?</Text>
                <Text style={{...sharedStyles.label, marginBottom: 25}}>N’hésitez pas à nous <Link navigateTo={'test'} text='contacter'></Link>. pour qu’on l’ajoute </Text>
                </ScrollView>
           
        </SafeAreaView>
    );
}

  