import React from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';

import SignupFooterNav from '../../Components/Utils/SignupFooterNav';
import { HideKeyboard } from '../../Components/Utils/HideKeyboard';
import TextLinkComponent from '../../Components/Utils/TextLinkComponent';

import { useSignUpContext } from '../../context/SignUpContext';

import { sharedStyles } from '../../utils/styles';
import { isIphoneX } from '../../utils/isIphoneX';
import { colors } from '../../utils/colors';

export default function SignUpStep2Container({ navigation }) {

    const SignUpContext = useSignUpContext()
    const [firstName, setFirstName] = React.useState("")

    const lastNameInput = React.useRef(null)

    //SignUpStep1
    return (
        <HideKeyboard>
            <View style={{ height: '100%', width: '100%' }}>
                <SafeAreaView style={{ height: '100%', width: '100%' }}>
                    <View style={{ width: '100%', height: '100%', paddingHorizontal: 10, paddingTop: isIphoneX() ? 40 : 20 }}>
                        <Text style={{ ...sharedStyles.h2, width: '100%' }}>Quel est ton nom ?</Text>
                        <Text style={{ ...sharedStyles.shortText, height: 55 }}>{'Comment doit-on vous appeler 😊'}</Text>
                        <TextInput
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            placeholder='Par ex : Nom Prénom'
                            placeholderTextColor={colors.primaryYellow}
                            style={{ ...sharedStyles.inputText, marginTop: 15 }}
                        // returnKeyType='next'
                        // onSubmitEditing={() => { lastNameInput.current.focus(); }}
                        ></TextInput>
                        {/* <TextInput
                        value={Name} onChangeText={(text) => setName(text)}
                        placeholder='Nom' placeholderTextColor={colors.primaryYellow}
                        style={{ ...sharedStyles.inputText, marginTop: 15 }}
                        ref={lastNameInput}
                    ></TextInput> */}
                        <Text style={{ ...sharedStyles.label, paddingTop: 15 }}>Ton nom de famille ne sera partagé uniquement qu’avec tes correspondances.</Text>
                        <TextLinkComponent navigateTo={() => console.log("navigate to")} text='Pourquoi ?'></TextLinkComponent>
                        {/* <TextLinkComponent navigateTo={() => console.log("navigate to")} text='termes de nos services'></TextLinkComponent> */}
                    </View>
                </SafeAreaView>

                <SignupFooterNav
                    title={"Suivant"}
                    canGoBack={true}
                    disabledButton={(!firstName.length > 0)}
                    onPressBack={navigation.goBack}
                    onPressContinue={() => navigation.navigate('SignUpStep3')}
                    updatecontext={() => SignUpContext.updateSignUp2(firstName)}
                >
                </SignupFooterNav>
            </View>
        </HideKeyboard>
    );
}
