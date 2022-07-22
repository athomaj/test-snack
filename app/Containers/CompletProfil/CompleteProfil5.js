import React, { Component } from 'react';
import { SafeAreaView, Image, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import ImagePickerExample from '../../Components/Utils/picturePicker';


export default function CompletProfil5({ navigation }) {
    const [buttonDisable, setDisabledButton] = React.useState(true)
    const [image, setImage] = React.useState('')

    React.useEffect(()=>{
        image ? setDisabledButton(false) : setDisabledButton(true);
    },[image])
  
    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 106}}>

                <SignupFooterNav disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('UpdateProfil4')}></SignupFooterNav>
                
                <Text style={{...sharedStyles.h2, marginBottom: 15}}>Photo de profil</Text>
                <Text style={{...sharedStyles.shortText, marginBottom:25}}>Dernière étapes, une belle photo de profil. Une photo donne vie à ton profil, donnant aux autres une meilleure idée de qui vous êtes.</Text>
                    <View style={{ height: '60%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImagePickerExample image={image?.uri} setParamImage={(returnImage) => setImage(returnImage)}></ImagePickerExample>
                    </View>

        </SafeAreaView>
    );
}