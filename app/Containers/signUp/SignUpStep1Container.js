import React from 'react';
import { SafeAreaView, TextInput, View, Text, StatusBar, Image } from 'react-native';
import PhoneInput from "react-native-phone-number-input";

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { HideKeyboard } from '../../Components/Utils/HideKeyboard';
import TextLinkComponent from '../../Components/Utils/TextLinkComponent';

import { useSignUpContext } from '../../context/SignUpContext';

import validateEmail from '../../utils/sharedFunctions';
import { isIphoneX } from '../../utils/isIphoneX';
import { sharedStyles } from '../../utils/styles';
import { colors } from '../../utils/colors';

//Importation dim'age de validation
const validateEmailicon = require('../../assets/icon/validated_color.png');
const forbidenEmail = require('../../assets/icon/forbiden_color.png');

export default function SignUpStep1Container({ navigation }) {

    const signUpContext = useSignUpContext();
    const [email, setEmail] = React.useState("jean-seb2b@live.fr")
    const [numberPhone, setNumberPhone] = React.useState("646402186")
    const [pass, setPass] = React.useState("123456")
    const [isvalidEmail, setValideEmail] = React.useState(false)
    const [isvalidPass, setValidePass] = React.useState(false)
    const [buttonDisable, setDisabledButton] = React.useState(true)

    const [validPhoneNumber, setValidPhoneNumber] = React.useState(false);
    const [value, setValue] = React.useState("646402186");

    const phoneInput = React.useRef(null);
    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);

    //En cliquant sur suivant, vous acceptez les termes de nos services, et notre politique de confidentialité. 

    function valideInputEmail() {
        if (validateEmail(email)) {
            setValideEmail(true)
        }
        else setValideEmail(false)
    }

    function calideIputPass() {
        if (pass.length > 5) {
            setValidePass(true)
        }
        else setValidePass(false)
    }

    React.useEffect(() => {
        valideInputEmail()
    }, [email])

    React.useEffect(() => {
        calideIputPass()
    }, [pass])


    React.useEffect(() => {
        validPhoneNumber && email && pass ? setDisabledButton(false) : setDisabledButton(true)
    }, [validPhoneNumber, email, pass])

    React.useEffect(() => {
        const checkValid = phoneInput.current?.isValidNumber(value);
        const collingCode = phoneInput.current?.getNumberAfterPossiblyEliminatingZero(value)

        setValidPhoneNumber(checkValid ? checkValid : false);

    }, [value])


    return (
        <HideKeyboard>
            <View style={{ height: '100%', width: '100%' }}>
                <SafeAreaView style={{ height: '100%', width: '100%' }}>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', paddingHorizontal: 10, paddingTop: isIphoneX() ? 40 : 20 }}>
                        <Text style={{ ...sharedStyles.h2, width: '100%' }}>Créer un compte</Text>
                        <Text style={{ ...sharedStyles.shortText, height: 55 }}>Quelques informations pour faire partie du club...</Text>
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
                                style={{ ...sharedStyles.inputText, marginVertical: 15, }}
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
                            <View style={{ ...sharedStyles.inputText, justifyContent: 'flex-start', alignItems: 'flex-start' }}>

                                <PhoneInput
                                    textInputProps={{ placeholder: 'Numéro de téléphone', placeholderTextColor: colors.primaryYellow, onEndEditing: () => { validPhoneNumber ? setNumberPhone(numberPhone) : '' } }}
                                    containerStyle={{ backgroundColor: '#E6EFF7' }}
                                    textContainerStyle={{ backgroundColor: '#E6EFF7' }}
                                    codeTextStyle={{ textAlignVertical: 'center', height: 20 }}
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
                        <Text style={{ ...sharedStyles.label, paddingTop: 15 }}>En cliquant sur suivant, vous acceptez <TextLinkComponent navigateTo={() => console.log("navigate to")} text='termes de nos services'></TextLinkComponent> , et notre <TextLinkComponent navigateTo={() => console.log("navigate to")} text='politique de confidentialité'></TextLinkComponent>.</Text>

                    </View>

                </SafeAreaView>

                <SignupFooterNav
                    title={"Suivant"}
                    canGoBack={true}
                    disabledButton={buttonDisable}
                    onPressBack={navigation.goBack}
                    onPressContinue={() => navigation.navigate('SignUpStep2')}
                    updatecontext={() => signUpContext.updateSignUp1(email, pass, numberPhone)}
                >
                </SignupFooterNav>
            </View>
        </HideKeyboard>
    );
}

