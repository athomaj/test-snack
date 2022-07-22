import React, { Component } from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { sharedStyles } from '../../utils/styles';



export default function CompletProfil2({ navigation }) {

    const [buttonDisable, setDisabledButton] = React.useState(false)
    const [typeOfCooksSelected, setTypeOfCooksSelected] = React.useState(false)

    const typeOfCooks = [
        {name:"Africaine"},
        {name:"Asiatique"},
        {name:"Britannique"},
        {name:"Cuisine des Iles"},
        {name:"Flammande"},
        {name:"Française gastronomique"},
        {name:"Française terroir"},
        {name:"Indienne"},
        {name:"orientale"},
        {name:"autre"},
        {name:"particulier"},
    ]
    React.useEffect(()=>{
        // console.log('SIGNUP CONTEXT =>',SignUpContext.signUpUser)
    })

    const renderItem = React.useCallback(
        ({item, index}) => {
            return(
                <TouchableOpacity onPress={() => setTypeOfCooksSelected(item.name)} style={{...sharedStyles.inputText, marginBottom:13, justifyContent: 'center'}}><Text style={{...sharedStyles.shortText, textAlignVertical: 'center'}}>{item.name}</Text>
                    { typeOfCooksSelected && item.name === typeOfCooksSelected &&
                        <Image source={require('../../assets/icon/validate_icon.png')} style={{position: 'absolute', right:8, width: 21, height: 21,}} />
                    }
                </TouchableOpacity>
            )},[typeOfCooksSelected])
  
    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%',paddingTop: 96, paddingHorizontal: 15, backgroundColor: 'white'}}>
            <SignupFooterNav syle={{backgroundColor: 'white'}} disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('UpdateProfil3')}></SignupFooterNav>
                
                <FlatList
                ListHeaderComponentStyle={{backgroundColor: 'white'}}
                ListHeaderComponent={<View>
                    <Text style={{...sharedStyles.h2, marginBottom: 15}}>Type de cuisine</Text>
                    <Text style={{...sharedStyles.shortText, marginBottom:25}}>Quoi que vous aimiez, vous le trouverez ici. </Text>
                </View>}
                style={{ width: '100%', height: '100%'}}
                contentContainerStyle={{paddingBottom: 80}}
                data={typeOfCooks}
                renderItem={renderItem}
                stickyHeaderIndices={[0]}
                />
        </SafeAreaView>
    );
}