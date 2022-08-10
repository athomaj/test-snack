import React from 'react';
import { SafeAreaView, TextInput, View, Text, Image } from 'react-native';
import PhoneInput from "react-native-phone-number-input";

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { HideKeyboard } from '../../Components/Utils/HideKeyboard';
import TextLinkComponent from '../../Components/Utils/TextLinkComponent';

import { useSignUpContext } from '../../context/SignUpContext';

import validateEmail from '../../utils/sharedFunctions';
import { isIphoneX } from '../../utils/isIphoneX';
import { sharedStyles } from '../../utils/styles';
import { colors } from '../../utils/colors';

const validateEmailicon = require('../../assets/icon/validated_color.png');
const forbidenEmail = require('../../assets/icon/forbiden_color.png');

export default function SignUpStep1Container({ navigation }) {

    const signUpContext = useSignUpContext();

    const [email, setEmail] = React.useState("");
    const [countryCode, setCountryCode] = React.useState("33");
    const [phone, setPhone] = React.useState("");
    const [password, setPass] = React.useState("");

    const [isvalidEmail, setValideEmail] = React.useState(false);
    const [isvalidPass, setValidePass] = React.useState(false);
    const [validPhoneNumber, setValidPhoneNumber] = React.useState(false);

    const phoneInput = React.useRef(null);
    const emailInput = React.useRef(null);
    const passwordInput = React.useRef(null);

    function onChangeEmail(text) {
        setEmail(text)
        setValideEmail(validateEmail(text))
    }

    function onChangePassword(text) {
        setPass(text)
        setValidePass(text.length > 5)
    }

    function onChangeCountry(country) {
        if (country.callingCode.length > 0) {
            setCountryCode(country.callingCode[0])
        }
    }

    function onChangePhone(text) {
        setPhone(text)
        setValidPhoneNumber(phoneInput.current?.isValidNumber(text))
    }

    return (
        <HideKeyboard>
            <View style={{ height: '100%', width: '100%' }}>
                <SafeAreaView style={{ height: '100%', width: '100%' }}>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center', paddingHorizontal: 10, paddingTop: isIphoneX() ? 40 : 20 }}>
                        <Text style={{ ...sharedStyles.h2, width: '100%' }}>Créer un compte</Text>
                        <Text style={{ ...sharedStyles.shortText, width: '100%' }}>Quelques informations pour faire partie du club...</Text>
                        <View style={{ height: 44, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
                            <TextInput
                                autoComplete='off'
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyType='next'
                                ref={emailInput}
                                value={email}
                                onChangeText={onChangeEmail}
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
                                value={password}
                                onChangeText={onChangePassword}
                                placeholder='Créer un mot de passe'
                                placeholderTextColor={colors.primaryYellow}
                                style={{ ...sharedStyles.inputText, marginVertical: 15, }}
                                returnKeyType='next'
                                ref={passwordInput}
                            >
                            </TextInput>
                            {password.length > 0 &&
                                <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15 }} source={isvalidPass ? validateEmailicon : forbidenEmail}></Image>
                            }
                        </View>
                        <View>
                            <PhoneInput
                                textInputProps={{
                                    placeholder: 'Numéro de téléphone',
                                    placeholderTextColor: colors.primaryYellow
                                }}
                                containerStyle={{ ...sharedStyles.inputText }}
                                textContainerStyle={{ height: 50, backgroundColor: "transparent" }}
                                codeTextStyle={{ textAlignVertical: 'center', height: 20 }}
                                ref={phoneInput}
                                value={phone}
                                defaultCode="FR"
                                layout="first"
                                onChangeCountry={onChangeCountry}
                                onChangeText={onChangePhone}
                            />
                            {phone.length > 0 &&
                                <Image style={{ position: 'absolute', zIndex: 1, width: 15, height: 15, right: 15, top: 15 }} source={validPhoneNumber ? validateEmailicon : forbidenEmail}></Image>
                            }
                        </View>
                        <Text style={{ ...sharedStyles.label, width: '100%', marginTop: 15 }}>En cliquant sur suivant, vous acceptez
                            <TextLinkComponent navigateTo={() => console.log("navigate to")} text=' termes de nos services '></TextLinkComponent>
                            , et notre
                            <TextLinkComponent navigateTo={() => console.log("navigate to")} text=' politique de confidentialité'></TextLinkComponent>
                            .
                        </Text>
                    </View>
                </SafeAreaView>

                <SignupFooterNav
                    title={"Suivant"}
                    canGoBack={true}
                    // disabledButton={false}
                    disabledButton={!(validPhoneNumber && isvalidEmail && password.length > 5)}
                    onPressBack={navigation.goBack}
                    onPressContinue={() => navigation.navigate('SignUpStep2')}
                    updatecontext={() => signUpContext.updateSignUp1(email, password, countryCode, phone)}
                >
                </SignupFooterNav>
            </View>
        </HideKeyboard>
    );
}

