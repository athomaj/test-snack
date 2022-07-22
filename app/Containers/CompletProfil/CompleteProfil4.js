import React, { Component } from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import TextArea from '../../Components/Utils/TextArea';


export default function CompletProfil4({ navigation }) {
    const [buttonDisable, setDisabledButton] = React.useState(true)
    const [pres, setPres] = React.useState('')
    const [pleasure, setPleasure] = React.useState('')
    const [favoriteDish, setFavoriteDish] = React.useState('')

    React.useEffect(()=>{
        pres.length > 1 && pleasure.length > 1 && favoriteDish.length > 1 ? setDisabledButton(false) : setDisabledButton(true);
    },[pres, favoriteDish, pleasure])
  
    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 106}}>
                <SignupFooterNav disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('UpdateProfil5')}></SignupFooterNav>

                <Text style={{...sharedStyles.h2, marginBottom: 15}}>A propos de vous</Text>
                <Text style={{...sharedStyles.shortText, marginBottom:25}}>Quoi que vous aimiez, vous le trouverez ici.</Text>

                <View style={{ width: '100%', height: 100}}>

                    <TextArea
                    value={pres}
                    heightSize= {170}
                    callBackText = {setPres}
                    maxChar = {400}
                    legend = 'test légende'
                    placeholder = 'Un bref descriptif de qui vous êtes...'
                    ismultiline= {true}
                    ></TextArea>

                    <TextArea
                    value={pleasure}
                    heightSize= {80}
                    callBackText = {setPleasure}
                    legend = 'Mon plaisir coupacle'
                    placeholder = 'Le chocolat'
                    ></TextArea>

                    <TextArea
                    value={favoriteDish}
                    heightSize= {90}
                    callBackText = {setFavoriteDish}
                    legend = 'Si je devais choisir mon plat préférée...'
                    placeholder = 'Le gateau au chocolat'
                    ></TextArea>

                </View>
           
        </SafeAreaView>
    );
}