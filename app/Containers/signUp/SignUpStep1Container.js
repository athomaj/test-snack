import React, { useEffect } from 'react';
import { SafeAreaView, TextInput, View, TouchableOpacity, Text, StatusBar, Image, Switch, StyleSheet, Modal, Alert } from 'react-native';
import { colors } from '../../utils/colors';
import { sharedStyles } from '../../utils/styles';
import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import Link from '../../Components/Utils/Link';
import validateEmail from '../../Components/Utils/RegexValidation';
import { useSignUpContext } from '../../context/SignUpContext';

import PhoneInput from "react-native-phone-number-input";
// import { Colors } from "react-native/Libraries/NewAppScreen";




//Importation dim'age de validation
const validateEmailicon = require('../../assets/icon/validated_color.png');
const forbidenEmail = require('../../assets/icon/forbiden_color.png');

export default function SignUpStep1Container({ navigation }) {

    const SignUpContext = useSignUpContext();
    const [email, setEmail] = React.useState("")
    const [numberPhone, setNumberPhone] = React.useState("")
    const [pass, setPass] = React.useState("")
    const [isvalidEmail, setValideEmail] = React.useState(false)
    const [isvalidPass, setValidePass] = React.useState(false)
    const [buttonDisable, setDisabledButton] = React.useState(true)

    const [validPhoneNumber, setValidPhoneNumber] =  React.useState(false);
    const [value, setValue] = React.useState("");
    const phoneInput =  React.useRef(null);
    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);
    
    //En cliquant sur suivant, vous acceptez les termes de nos services, et notre politique de confidentialité. 
   
    function valideInputEmail()
    {
        if(validateEmail(email)){
            setValideEmail(true)
        }
        else setValideEmail(false)
    }

    function calideIputPass()
    {
        if(pass.length > 5)
        {
            setValidePass(true)
        }
        else setValidePass(false)
    }

    React.useEffect(()=>{
        valideInputEmail()
    },[email])

    React.useEffect(()=>{
        calideIputPass()
    },[pass])


    React.useEffect(()=>{
        validPhoneNumber && email && pass ? setDisabledButton(false) : setDisabledButton(true)
    },[validPhoneNumber,email,pass])

    React.useEffect(()=>{
        const checkValid = phoneInput.current?.isValidNumber(value);
        const collingCode = phoneInput.current?.getNumberAfterPossiblyEliminatingZero(value)
        console.log(collingCode)
        setValidPhoneNumber(checkValid ? checkValid : false);
                
    },[value])     


    return (
        <SafeAreaView style={{ height: '100%', width: '100%', paddingHorizontal: 15, paddingTop: 80 }}>
                <SignupFooterNav disabledButton= {buttonDisable} onPressBack={navigation.goBack} onPressContinue={() => navigation.navigate('SignUpStep2')} updatecontext={() => SignUpContext.updateSignUp1(email,pass,numberPhone)}></SignupFooterNav>
        
                <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                    <Text style={{...sharedStyles.h2, width: '100%'}}>Créer un compte</Text>
                    <Text style={{...sharedStyles.shortText,  height:55}}>Quelques informations pour faire partie du club...</Text>
                    <View style={{ height: 44, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                        <TextInput 
                        autoComplete='off' 
                        autoCapitalize='none' 
                        keyboardType='email-address'
                        returnKeyType='next'
                        ref={emailInput}
                        value={email} onChangeText={(text) => setEmail(text)} 
                        placeholder='Entrer votre email' 
                        placeholderTextColor={colors.primaryYellow} 
                        style={{ ...sharedStyles.inputText }}
                        onSubmitEditing={() => { passwordInput.current.focus(); }}
                        >
                        </TextInput>
                        {email.length > 0 &&
                            <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15 }} source={isvalidEmail ? validateEmailicon : forbidenEmail}></Image>
                        }
                    </View>
                    <View style={{ height: 44, width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}>
                    <TextInput
                    textContentType='password'
                     secureTextEntry={true}
                     value={pass}
                     onChangeText={(text) => setPass(text)}
                     placeholder='Créer un mot de passe'
                     placeholderTextColor={colors.primaryYellow}
                     style={{ ...sharedStyles.inputText, marginVertical: 15,}}
                     returnKeyType='next'
                     ref={passwordInput}
                        >
                     </TextInput>
                    {pass.length > 0 &&
                            <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15 }} source={isvalidPass ? validateEmailicon : forbidenEmail}></Image>
                        }
                    </View>
                    <>
                    <StatusBar barStyle="light-content" />
                    <View style={{...sharedStyles.inputText, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                        
                        <PhoneInput
                        textInputProps={{placeholder: 'Numéro de téléphone', placeholderTextColor: colors.primaryYellow, onEndEditing: ()=>{validPhoneNumber ? setNumberPhone(numberPhone): ''} }}
                        containerStyle={{backgroundColor: '#E6EFF7'}}
                        textContainerStyle={{backgroundColor: '#E6EFF7'}}
                        codeTextStyle={{ textAlignVertical: 'center', height:20}}
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="FR"
                        layout="first"
                        onChangeText={(text) => {
                            setValue(text);
                            setNumberPhone(text);
                        }}
                        />

                        {value.length > 0 &&
                                    <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15, top: 15 }} source={validPhoneNumber ? validateEmailicon : forbidenEmail}></Image>
                                }
                    </View>
                </>
                    <Text style={{...sharedStyles.label, paddingTop: 15}}>En cliquant sur suivant, vous acceptez <Link navigateTo={'test'} text='termes de nos services'></Link> , et notre <Link navigateTo={'test'} text='politique de confidentialité'></Link>.</Text>

                </View>
           
        </SafeAreaView>
    );
}

  