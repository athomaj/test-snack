import React, { Component } from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image, Switch, StyleSheet, Modal, Alert, Dimensions, FlatList, ScrollView, InteractionManager } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import Link from '../../Components/Utils/Link';
import {Picker} from '@react-native-picker/picker';
import { useSignUpContext } from '../../context/SignUpContext';



export default function SignUpStep3Container({ navigation }) {

    const [buttonDisable, setDisabledButton] = React.useState(true)
    const WIDTHCONTAINER = (Dimensions.get('window').width/3)-21;
    const [regime, setregime] = React.useState(null)
    const CITYS = [
        { 
        name : 'Sans Gluten',
        id : 1,
        },
        { 
        name: 'Vegan',
        id: 2,
        },
        { 
        name: 'Végétarien',
        id: 3,
        },
        { 
        name: 'Sans Alcool',
        id: 4,
        },
        { 
        name: 'Sans Sucre',
        id: 5,
        },
        { 
        name: 'Sans Arachide',
        id: 6,
        },
        { 
        name: 'Hallal',
        id: 6,
        },
        { 
        name: 'Casher',
        id: 6,
        },
        { 
        name: 'RAS',
        id: 6,
        },
    ]


    React.useEffect(()=>{
        regime?.length > 0 ? setDisabledButton(false) : null
    },[regime])

    function updateRegime(item){
         const modifyArray =  regime?.length > 0 ? [...regime] : []
        if(modifyArray.length > 0 )
        {
            modifyArray.find( element => element.name === item.name) ? modifyArray.splice(modifyArray.indexOf(item.name), 1)  : modifyArray.push(item)
            // modifyArray.forEach(element => {
            //     const index = modifyArray.indexOf(element)
            //     console.log('INDEX ====> ',index)
            //     element.name === item.name ? modifyArray.splice(index, 1) : 
            // });
        }
        else  modifyArray.push(item)
        setregime(modifyArray)
    }

    function itemSelected(itemName){
        if(regime?.length > 0)
        {
        return  regime.find( element => element.name === itemName)
        } else return false
    }
    
  
    const renderItem = React.useCallback(
        ({ item, index }) => {
            return(
            <TouchableOpacity onPress={() => updateRegime(item)} style={{backgroundColor: itemSelected(item.name) ? colors.primaryYellow : '#E6EFF7', height: WIDTHCONTAINER, width:WIDTHCONTAINER, borderRadius: 4, marginBottom: 12, justifyContent:'center', alignItems: 'center'}}>
                { itemSelected(item.name) ?
                <Image source={require('../../assets/icon/whiteCarrot.png')} style={{width: 35, height: 35, resizeMode: 'contain'}} />
                :
                <Image source={require('../../assets/icon/blueCarrot.png')} style={{width: 35, height: 35, resizeMode: 'contain'}}/>
                }
                <Text style={{
                    fontSize: 13,
                    color: itemSelected(item.name) ? 'white' : colors.primaryYellow,
                    fontWeight: '500',}}
                >{item.name}</Text>
                
            </TouchableOpacity>)},
        [regime]
    );

    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 80 }}>
                <SignupFooterNav disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('UpdateProfil4')}></SignupFooterNav>


                <ScrollView style={{ width: '100%', height: '100%'}} scrollEnabled={false}>
                    <Text style={{...sharedStyles.h2, width: '100%'}}>Régime alimentaire</Text>
                    <Text style={{...sharedStyles.shortText, height:55}}>Phrase de description</Text>
                    <FlatList
                    data={CITYS}
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

  