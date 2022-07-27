import React, { useRef } from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, ActivityIndicator, Image, Switch, StyleSheet, Modal, Alert } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import Link from '../../Components/Utils/Link';
import { useSignUpContext } from '../../context/SignUpContext';



export default function SignUpStep2Container({ navigation }) {

    const SignUpContext = useSignUpContext()
    const [firstName, setFirstName] = React.useState("")
    const [Name, setName] = React.useState("")
    const [buttonDisable, setDisabledButton] = React.useState(true)
    const lastNameInput = useRef(null)

   React.useEffect(()=>{
    firstName.length > 0 && Name.length > 0 ? setDisabledButton(false) : setDisabledButton(true);
   })

    //SignUpStep1
    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 80 }}>
                <SignupFooterNav disabledButton={buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('SignUpStep3')} updatecontext={() => SignUpContext.updateSignUp2(firstName,Name)}></SignupFooterNav>
        
                <View style={{ width: '100%', height: '100%'}}>
                    <Text style={{...sharedStyles.h2, width: '100%'}}>Quels est ton nom ?</Text>
                    <Text style={{...sharedStyles.shortText, height:55}}>{'Comment doit-on vous appeler :)'}</Text>
                    <TextInput 
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    placeholder='Prénom' placeholderTextColor={colors.primaryYellow} 
                    style={{ ...sharedStyles.inputText, marginTop: 15}}
                    returnKeyType='next'
                    onSubmitEditing={() => { lastNameInput.current.focus(); }}
                    ></TextInput>
                    <TextInput 
                    value={Name} onChangeText={(text) => setName(text)}
                    placeholder='Nom' placeholderTextColor={colors.primaryYellow} 
                    style={{ ...sharedStyles.inputText, marginTop: 15}}
                    ref= {lastNameInput}
                    ></TextInput>
                    <Text style={{...sharedStyles.label, paddingTop: 15}}>Ton nom de famille ne sera partagé uniquement qu’avec tes correspondances.</Text>
                    <Link navigateTo={'test'} text='Pourquoi ?'></Link>
                    {/* <Link navigateTo={'test'} text='termes de nos services'></Link> */}
                </View>
           
        </SafeAreaView>
    );
}

  